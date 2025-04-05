'use client'

import React, { useState, useEffect } from 'react';
import { Loader2, Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { Question, Reponse } from '@/lib/types/question-reponse-admin';
import { useQuestions } from '@/hooks/use-Questions';
import { useReponses } from '@/hooks/use-Responses';

interface QuestionManagerProps {
  processusId: number;
  onClose: () => void;
}

export const QuestionManager: React.FC<QuestionManagerProps> = ({ processusId, onClose }) => {
  const { questions, loading, error, fetchQuestions, createQuestion, updateQuestion, deleteQuestion } = useQuestions(processusId);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [editingQuestion, setEditingQuestion] = useState<{ id: number; label: string } | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    try {
      setIsCreating(true);
      await createQuestion({ label: newQuestion, processus_id: processusId });
      setNewQuestion('');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateQuestion = async (id: number) => {
    if (!editingQuestion || editingQuestion.id !== id) return;
    
    try {
      await updateQuestion(id, { label: editingQuestion.label });
      setEditingQuestion(null);
    } catch (error) {
      console.error('Failed to update question:', error);
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    try {
      setIsDeleting(id);
      await deleteQuestion(id);
      if (selectedQuestion?.id === id) {
        setSelectedQuestion(null);
      }
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Gestion des Questions</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="border-r pr-6">
            <form onSubmit={handleCreateQuestion} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Nouvelle question..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isCreating || !newQuestion.trim()}
                  className="inline-flex items-center px-4 py-2 bg-[#2C9CC6] text-white rounded-lg hover:bg-[#2C9CC6]/80 transition-colors disabled:opacity-50"
                >
                  {isCreating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>

            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-4">{error}</div>
            ) : (
              <div className="space-y-2">
                {questions.map((question) => (
                  <div
                    key={question.id}
                    className={`p-3 rounded-lg border ${
                      selectedQuestion?.id === question.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } cursor-pointer`}
                  >
                    {editingQuestion?.id === question.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingQuestion.label}
                          onChange={(e) =>
                            setEditingQuestion({ ...editingQuestion, label: e.target.value })
                          }
                          className="flex-1 px-2 py-1 border border-gray-300 rounded"
                        />
                        <button
                          onClick={() => handleUpdateQuestion(question.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setEditingQuestion(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => setSelectedQuestion(question)}
                        >
                          {question.label}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingQuestion({ id: question.id, label: question.label });
                            }}
                            className="text-gray-400 hover:text-blue-600"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteQuestion(question.id);
                            }}
                            className="text-gray-400 hover:text-red-600"
                            disabled={isDeleting === question.id}
                          >
                            {isDeleting === question.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {selectedQuestion && (
              <ReponseManager
                questionId={selectedQuestion.id}
                onQuestionUpdate={() => fetchQuestions()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ReponseManagerProps {
  questionId: number;
  onQuestionUpdate: () => void;
}

const ReponseManager: React.FC<ReponseManagerProps> = ({ questionId, onQuestionUpdate }) => {
  const {
    reponses,
    loading,
    error,
    fetchReponses,
    createReponse,
    updateReponse,
    deleteReponse
  } = useReponses(questionId);

  const [newReponse, setNewReponse] = useState({ label: '', is_true: false });
  const [editingReponse, setEditingReponse] = useState<Reponse | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetchReponses();
  }, [fetchReponses]);

  const handleCreateReponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReponse.label.trim()) return;

    try {
      setIsCreating(true);
      await createReponse({
        ...newReponse,
        question_id: questionId
      });
      setNewReponse({ label: '', is_true: false });
      onQuestionUpdate();
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateReponse = async (id: number) => {
    if (!editingReponse) return;

    try {
      await updateReponse(id, {
        label: editingReponse.label,
        is_true: editingReponse.is_true
      });
      setEditingReponse(null);
      onQuestionUpdate();
    } catch (error) {
      console.error('Failed to update response:', error);
    }
  };

  const handleDeleteReponse = async (id: number) => {
    try {
      setIsDeleting(id);
      await deleteReponse(id);
      onQuestionUpdate();
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Réponses</h3>

      <form onSubmit={handleCreateReponse} className="mb-4">
        <div className="space-y-2">
          <input
            type="text"
            value={newReponse.label}
            onChange={(e) => setNewReponse({ ...newReponse, label: e.target.value })}
            placeholder="Nouvelle réponse..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_true"
              checked={newReponse.is_true}
              onChange={(e) => setNewReponse({ ...newReponse, is_true: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="is_true" className="text-sm text-gray-700">
              Réponse correcte
            </label>
          </div>
          <button
            type="submit"
            disabled={isCreating || !newReponse.label.trim()}
            className="w-full inline-flex items-center justify-center px-4 py-2 bg-[#2C9CC6] text-white rounded-lg hover:bg-[#2C9CC6]/80 transition-colors disabled:opacity-50"
          >
            {isCreating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Ajouter une réponse
              </>
            )}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : (
        <div className="space-y-2">
          {reponses.map((reponse) => (
            <div
              key={reponse.id}
              className={`p-3 rounded-lg border ${
                reponse.is_true ? 'border-green-200 bg-green-50' : 'border-gray-200'
              }`}
            >
              {editingReponse?.id === reponse.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editingReponse.label}
                    onChange={(e) =>
                      setEditingReponse({ ...editingReponse, label: e.target.value })
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingReponse.is_true}
                      onChange={(e) =>
                        setEditingReponse({ ...editingReponse, is_true: e.target.checked })
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="text-sm text-gray-700">Réponse correcte</label>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateReponse(reponse.id)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setEditingReponse(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={reponse.is_true}
                      readOnly
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{reponse.label}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingReponse(reponse)}
                      className="text-gray-400 hover:text-blue-600"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteReponse(reponse.id)}
                      className="text-gray-400 hover:text-red-600"
                      disabled={isDeleting === reponse.id}
                    >
                      {isDeleting === reponse.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};