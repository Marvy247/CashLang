import { templates } from '@cashlang/core';
import { useEditorStore } from '../store/editorStore';
import { Sparkles, Zap, Shield, Coins } from 'lucide-react';
import toast from 'react-hot-toast';

const categoryIcons = {
  defi: Zap,
  nft: Sparkles,
  dao: Shield,
  token: Coins,
  other: Sparkles
};

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700 border-green-300',
  intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  advanced: 'bg-red-100 text-red-700 border-red-300'
};

export function TemplateGallery() {
  const { loadTemplate, setSelectedTemplate } = useEditorStore();

  const handleSelectTemplate = (template: typeof templates[0]) => {
    loadTemplate(template);
    setSelectedTemplate(template);
    toast.success(`📝 Loaded: ${template.name}`);
  };

  return (
    <div className="h-full overflow-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Template Gallery</h2>
        <p className="text-gray-600">Start with production-ready CashTokens contracts</p>
      </div>

      <div className="grid gap-4">
        {templates.map((template) => {
          const Icon = categoryIcons[template.category];
          return (
            <div
              key={template.id}
              onClick={() => handleSelectTemplate(template)}
              className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${difficultyColors[template.difficulty]}`}>
                  {template.difficulty}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {template.features.map((feature, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
