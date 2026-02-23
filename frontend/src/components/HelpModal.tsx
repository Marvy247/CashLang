import { X, Keyboard } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  const shortcuts = [
    { keys: ['Ctrl', 'S'], action: 'Compile contract' },
    { keys: ['Ctrl', 'T'], action: 'Open templates' },
    { keys: ['Ctrl', '/'], action: 'Toggle comment' },
    { keys: ['Ctrl', 'F'], action: 'Find in editor' },
    { keys: ['Ctrl', 'H'], action: 'Find and replace' },
    { keys: ['Alt', 'Up/Down'], action: 'Move line up/down' },
    { keys: ['Ctrl', 'D'], action: 'Select next occurrence' },
    { keys: ['F11'], action: 'Toggle fullscreen' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-between px-6 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            <h2 className="font-bold text-lg">Keyboard Shortcuts</h2>
          </div>
          <button
            onClick={onClose}
            className="text-2xl hover:bg-white/20 w-8 h-8 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid gap-3">
            {shortcuts.map((shortcut, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{shortcut.action}</span>
                <div className="flex gap-1">
                  {shortcut.keys.map((key, j) => (
                    <kbd
                      key={j}
                      className="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-mono shadow-sm"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Quick Tips</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use templates to get started quickly</li>
              <li>• Check the output panel for compilation errors</li>
              <li>• Simulation runs automatically after successful compilation</li>
              <li>• Export artifacts for deployment with CashScript SDK</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
