import { useState } from 'react';
import { 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiChevronRight, 
  FiExternalLink 
} from 'react-icons/fi';

export default function BraveNotificationToast() {
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepCompleted, setStepCompleted] = useState({ 1: false, 2: false, 3: false });

  const toggleSteps = () => {
    setShowSteps(!showSteps);
  };

  const markStepComplete = (step) => {
    setStepCompleted({
      ...stepCompleted,
      [step]: !stepCompleted[step]
    });
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-orange-500 flex items-center">
        <FiAlertTriangle className="text-white mr-2" size={18} />
        <h3 className="text-white font-medium text-sm">Brave Browser Notification Issue</h3>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
          Brave is blocking push notifications needed for important updates.
        </p>

        <button
          onClick={toggleSteps}
          className="flex items-center justify-between w-full py-2 px-3 bg-orange-50 dark:bg-gray-700 rounded-md text-orange-600 dark:text-orange-300 font-medium text-sm mb-2"
        >
          <span>How to fix this issue</span>
          <FiChevronRight className={`transition-transform duration-300 ${showSteps ? 'rotate-90' : ''}`} size={16} />
        </button>

        {/* Steps */}
        {showSteps && (
          <div className="mt-2 border-l-2 border-orange-200 dark:border-gray-600 pl-4 space-y-4">
            <div className={`transition-all duration-300 ${currentStep === 1 ? 'opacity-100' : 'opacity-50'}`}>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-orange-100 dark:bg-gray-700 text-orange-500 dark:text-orange-300 text-xs font-bold">
                  1
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">Go to:</p>
                  <div className="flex items-center mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                    <code className="text-orange-600 dark:text-orange-300">brave://settings/privacy</code>
                    <button 
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" 
                      title="Open in new tab"
                    >
                      <FiExternalLink size={14} />
                    </button>
                  </div>
                </div>
                <div className="ml-auto">
                  <button 
                    onClick={() => markStepComplete(1)} 
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${stepCompleted[1] ? 'bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'}`}
                  >
                    {stepCompleted[1] ? <FiCheckCircle size={14} /> : null}
                  </button>
                </div>
              </div>
              {currentStep === 1 && (
                <div className="ml-9 mt-2">
                  <button 
                    onClick={handleNextStep}
                    className="px-3 py-1 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
                  >
                    Next Step
                  </button>
                </div>
              )}
            </div>

            <div className={`transition-all duration-300 ${currentStep === 2 ? 'opacity-100' : 'opacity-50'}`}>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-orange-100 dark:bg-gray-700 text-orange-500 dark:text-orange-300 text-xs font-bold">
                  2
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">Enable:</p>
                  <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-medium text-gray-800 dark:text-gray-200">
                    "Use Google services for push messaging"
                  </div>
                </div>
                <div className="ml-auto">
                  <button 
                    onClick={() => markStepComplete(2)} 
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${stepCompleted[2] ? 'bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'}`}
                  >
                    {stepCompleted[2] ? <FiCheckCircle size={14} /> : null}
                  </button>
                </div>
              </div>
              {currentStep === 2 && (
                <div className="ml-9 mt-2">
                  <button 
                    onClick={handleNextStep}
                    className="px-3 py-1 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
                  >
                    Next Step
                  </button>
                </div>
              )}
            </div>

            <div className={`transition-all duration-300 ${currentStep === 3 ? 'opacity-100' : 'opacity-50'}`}>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-orange-100 dark:bg-gray-700 text-orange-500 dark:text-orange-300 text-xs font-bold">
                  3
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">Reload this page and allow notifications when prompted</p>
                </div>
                <div className="ml-auto">
                  <button 
                    onClick={() => markStepComplete(3)} 
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${stepCompleted[3] ? 'bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'}`}
                  >
                    {stepCompleted[3] ? <FiCheckCircle size={14} /> : null}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex justify-end space-x-2">
          <button className="py-1.5 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 text-sm rounded-md transition-colors">
            Dismiss
          </button>
          <button className="py-1.5 px-3 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-md transition-colors">
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}