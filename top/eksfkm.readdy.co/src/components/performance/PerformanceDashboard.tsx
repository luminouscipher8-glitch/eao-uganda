import React, { useState } from 'react';
import { usePerformanceContext } from '../../hooks/usePerformanceMonitoring';
import { PERFORMANCE_THRESHOLDS } from '../../hooks/usePerformanceMonitoring';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  threshold: { good: number; needsImprovement: number };
  icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  rating,
  threshold,
  icon,
}) => {
  const getRatingColor = () => {
    switch (rating) {
      case 'good':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'needs-improvement':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'poor':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getProgressPercentage = () => {
    if (value <= threshold.good) return 100;
    if (value <= threshold.needsImprovement) {
      return (
        50 +
        ((value - threshold.good) /
          (threshold.needsImprovement - threshold.good)) *
          50
      );
    }
    return Math.max(
      0,
      50 -
        ((value - threshold.needsImprovement) / threshold.needsImprovement) * 50
    );
  };

  const getProgressColor = () => {
    if (rating === 'good') return 'bg-green-500';
    if (rating === 'needs-improvement') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className={`p-4 rounded-xl border-2 ${getRatingColor()}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <i className={`${icon} text-xl`}></i>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            rating === 'good'
              ? 'bg-green-100 text-green-700'
              : rating === 'needs-improvement'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
          }`}
        >
          {rating === 'good'
            ? 'Good'
            : rating === 'needs-improvement'
              ? 'Needs Improvement'
              : 'Poor'}
        </span>
      </div>

      <div className="mb-3">
        <div className="text-2xl font-bold">
          {value.toLocaleString()}
          <span className="text-sm font-normal ml-1">{unit}</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${getProgressColor()}`}
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>

      <div className="text-xs text-gray-600">
        Target: ≤{threshold.good}
        {unit}
      </div>
    </div>
  );
};

export const PerformanceDashboard: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const {
    metrics,
    getPerformanceScore,
    getPerformanceRating,
    getPerformanceRecommendations,
  } = usePerformanceContext();
  const [showDetails, setShowDetails] = useState(false);

  if (!isOpen || !metrics) return null;

  const { vitals } = metrics;
  const overallScore = getPerformanceScore(vitals);
  const recommendations = getPerformanceRecommendations(vitals);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Performance Dashboard
              </h2>
              <p className="text-gray-600 mt-1">
                Core Web Vitals & Performance Metrics
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        {/* Overall Score */}
        <div className="p-6 bg-gradient-to-r from-teal-50 to-amber-50">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {overallScore}
            </div>
            <div className="text-lg text-gray-600 mb-4">Performance Score</div>
            <div className="w-full bg-gray-200 rounded-full h-4 max-w-md mx-auto">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${
                  overallScore >= 90
                    ? 'bg-green-500'
                    : overallScore >= 70
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${overallScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Core Web Vitals */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Core Web Vitals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Largest Contentful Paint"
              value={Math.round(vitals.lcp)}
              unit="ms"
              rating={getPerformanceRating(vitals.lcp, 'LCP')}
              threshold={PERFORMANCE_THRESHOLDS.LCP}
              icon="ri-image-line"
            />
            <MetricCard
              title="First Input Delay"
              value={Math.round(vitals.fid)}
              unit="ms"
              rating={getPerformanceRating(vitals.fid, 'FID')}
              threshold={PERFORMANCE_THRESHOLDS.FID}
              icon="ri-cursor-line"
            />
            <MetricCard
              title="Cumulative Layout Shift"
              value={vitals.cls}
              unit=""
              rating={getPerformanceRating(vitals.cls, 'CLS')}
              threshold={PERFORMANCE_THRESHOLDS.CLS}
              icon="ri-layout-grid-line"
            />
            <MetricCard
              title="First Contentful Paint"
              value={Math.round(vitals.fcp)}
              unit="ms"
              rating={getPerformanceRating(vitals.fcp, 'FCP')}
              threshold={PERFORMANCE_THRESHOLDS.FCP}
              icon="ri-paint-brush-line"
            />
            <MetricCard
              title="Time to First Byte"
              value={Math.round(vitals.ttfb)}
              unit="ms"
              rating={getPerformanceRating(vitals.ttfb, 'TTFB')}
              threshold={PERFORMANCE_THRESHOLDS.TTFB}
              icon="ri-server-line"
            />
            <MetricCard
              title="Interaction to Next Paint"
              value={Math.round(vitals.inp)}
              unit="ms"
              rating={getPerformanceRating(vitals.inp, 'INP')}
              threshold={PERFORMANCE_THRESHOLDS.INP}
              icon="ri-hand-coin-line"
            />
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recommendations
            </h3>
            <div className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg"
                >
                  <i className="ri-lightbulb-line text-amber-600 mt-0.5"></i>
                  <p className="text-sm text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
            >
              <i className="ri-information-line"></i>
              {showDetails ? 'Hide' : 'Show'} Technical Details
            </button>
            <div className="text-sm text-gray-500">
              Last updated: {new Date(metrics.timestamp).toLocaleString()}
            </div>
          </div>

          {showDetails && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Technical Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">URL:</span>
                  <div className="text-gray-600 break-all">{metrics.url}</div>
                </div>
                <div>
                  <span className="font-medium">Resources:</span>
                  <div className="text-gray-600">
                    {metrics.resources.length} loaded
                  </div>
                </div>
                <div>
                  <span className="font-medium">Memory Usage:</span>
                  <div className="text-gray-600">
                    {metrics.memory
                      ? `${Math.round(metrics.memory.usedJSHeapSize / 1048576)}MB`
                      : 'N/A'}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Navigation Type:</span>
                  <div className="text-gray-600">{metrics.navigation.type}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Performance data is collected using the Web Vitals library
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Performance toggle button for development
export const PerformanceToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Only show in development or with a query parameter
  const shouldShow =
    import.meta.env.DEV || window.location.search.includes('debug=true');

  if (!shouldShow) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 p-3 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-colors"
        title="Open Performance Dashboard"
      >
        <i className="ri-dashboard-line text-xl"></i>
      </button>
      <PerformanceDashboard isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
