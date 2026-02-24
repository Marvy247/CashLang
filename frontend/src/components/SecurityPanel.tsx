import { Shield, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

interface SecurityPanelProps {
  darkMode: boolean;
}

export function SecurityPanel({ darkMode }: SecurityPanelProps) {
  const { securityReport } = useEditorStore();

  if (!securityReport) {
    return (
      <div className={`p-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm text-center`}>
        Compile your contract to see security analysis
      </div>
    );
  }

  const { score, issues, passed } = securityReport;
  const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F';
  const gradeColor = score >= 90 ? 'green' : score >= 75 ? 'blue' : score >= 60 ? 'yellow' : score >= 40 ? 'orange' : 'red';

  return (
    <div className="p-4 space-y-4">
      {/* Security Score */}
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Shield className={`w-5 h-5 text-${gradeColor}-500`} />
            <span className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Security Score</span>
          </div>
          <div className={`text-3xl font-bold text-${gradeColor}-500`}>{grade}</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full bg-${gradeColor}-500`}
            style={{ width: `${score}%` }}
          />
        </div>
        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
          {score}/100 points
        </div>
      </div>

      {/* Issues */}
      {issues.length > 0 && (
        <div className="space-y-2">
          <h4 className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Issues Found ({issues.length})
          </h4>
          {issues.map((issue, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border ${
                issue.severity === 'critical'
                  ? darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
                  : issue.severity === 'warning'
                  ? darkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'
                  : darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-start gap-2">
                {issue.severity === 'critical' ? (
                  <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                ) : issue.severity === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {issue.title}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                    {issue.description}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-2 italic`}>
                    💡 {issue.suggestion}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Passed Checks */}
      {passed.length > 0 && (
        <div className="space-y-2">
          <h4 className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Passed Checks ({passed.length})
          </h4>
          <div className="space-y-1">
            {passed.map((check, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{check}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
