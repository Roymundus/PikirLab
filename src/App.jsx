import React, { useEffect, useMemo, useState } from 'react';
import { modules, diagnosticQuestions } from './data.js';

// Layout & Common Components
import Topbar from './components/layout/Topbar.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import Footer from './components/layout/Footer.jsx';
import Toast from './components/common/Toast.jsx';

// Pages
import Home from './components/pages/Home.jsx';
import Dashboard from './components/pages/Dashboard.jsx';
import Diagnostic from './components/pages/Diagnostic.jsx';
import Path from './components/pages/Path.jsx';
import Lesson from './components/pages/Lesson.jsx';
import Reflection from './components/pages/Reflection.jsx';

/* ── Constants ────────────────────────────────────────────── */
const STORAGE_KEY = 'pikir-lab-react-v1';

const initialState = {
  level: 'dasar',
  points: 0,
  attempts: 0,
  diagnostic: { completed: false, score: null, recommendedLevel: 'dasar' },
  progress: {},
  reflection: { concept: '', challenge: '', use: '' },
};

/* ── Helpers ──────────────────────────────────────────────── */
function readSavedState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return initialState;
    return {
      ...initialState,
      ...saved,
      diagnostic: { ...initialState.diagnostic, ...saved.diagnostic },
      progress:   saved.progress || {},
      reflection: { ...initialState.reflection, ...saved.reflection },
    };
  } catch {
    return initialState;
  }
}

function moduleProgress(progress, id) {
  return progress[id] || { completed: false, bestScore: null, attempts: 0, reflection: '' };
}

/* ── Root Application Component ───────────────────────────── */
export default function App() {
  const [state, setState]               = useState(readSavedState);
  const [page, setPage]                 = useState('home');
  const [activeModule, setActiveModule] = useState('dekomposisi');
  const [diagIndex, setDiagIndex]       = useState(0);
  const [diagAnswers, setDiagAnswers]   = useState({});
  const [diagResult, setDiagResult]     = useState(null);
  const [lessonAnswer, setLessonAnswer] = useState({});
  const [feedback, setFeedback]         = useState({});
  const [toast, setToast]               = useState('');
  const [reflectionDraft, setReflectionDraft] = useState(state.reflection);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be disabled */
    }
  }, [state]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const completedCount = useMemo(
    () => modules.filter(m => moduleProgress(state.progress, m.id).completed).length,
    [state.progress]
  );

  const totalProgress   = Math.round((completedCount / modules.length) * 100);
  const currentModule   = modules.find(m => m.id === activeModule) || modules[0];
  const currentProgress = moduleProgress(state.progress, currentModule.id);

  function navigate(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openLesson(id) {
    setActiveModule(id);
    setLessonAnswer(prev => ({ ...prev, [id]: undefined }));
    setFeedback(prev => ({ ...prev, [id]: undefined }));
    navigate('lesson');
  }

  function patchModule(id, patch) {
    setState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        [id]: { ...moduleProgress(prev.progress, id), ...patch },
      },
    }));
  }

  function startDiagnostic() {
    setDiagIndex(0);
    setDiagAnswers({});
    setDiagResult(null);
    navigate('diagnostic');
  }

  function submitDiagnostic() {
    if (Object.keys(diagAnswers).length !== diagnosticQuestions.length) {
      setToast('Jawab semua pertanyaan dulu, ya!');
      return;
    }
    const correct  = diagnosticQuestions.filter((q, i) => diagAnswers[i] === q.correct).length;
    const score    = Math.round((correct / diagnosticQuestions.length) * 100);
    const recommendedLevel = score <= 25 ? 'dasar' : score <= 75 ? 'menengah' : 'lanjutan';
    setDiagResult({ score, recommendedLevel });
    setState(prev => ({
      ...prev,
      diagnostic: { completed: true, score, recommendedLevel },
      level: recommendedLevel,
    }));
    setToast('Asesmen selesai! Kamu sudah punya titik awal belajar.');
  }

  function checkLesson() {
    const answer = lessonAnswer[currentModule.id];
    if (answer === undefined) {
      setToast('Pilih jawaban dulu, ya!');
      return;
    }

    const good         = answer === currentModule.correct;
    const old          = moduleProgress(state.progress, currentModule.id);
    const nextAttempts = old.attempts + 1;

    setState(prev => ({
      ...prev,
      points:   good && !old.completed ? prev.points + 20 : prev.points,
      attempts: prev.attempts + 1,
      progress: {
        ...prev.progress,
        [currentModule.id]: {
          ...moduleProgress(prev.progress, currentModule.id),
          attempts:  nextAttempts,
          bestScore: Math.max(old.bestScore ?? 0, good ? 100 : 0),
          completed: old.completed || good,
        },
      },
    }));

    setFeedback(prev => ({ ...prev, [currentModule.id]: good ? 'correct' : 'try' }));
    setToast(
      good
        ? old.completed
          ? 'Jawaban tepat! Kamu makin mantap ✨'
          : 'Mantap! +20 poin dan latihan berhasil 🎉'
        : 'Belum tepat. Baca kembali materinya, lalu coba lagi 🌱'
    );
  }

  function resetProgress() {
    if (!window.confirm('Yakin ingin menghapus semua progres dan refleksi di browser ini?')) return;
    setState(initialState);
    setReflectionDraft(initialState.reflection);
    setDiagAnswers({});
    setDiagResult(null);
    setLessonAnswer({});
    setFeedback({});
    navigate('home');
    setToast('Progres direset. Kamu bisa mulai lagi kapan saja.');
  }

  function saveReflection() {
    setState(prev => ({ ...prev, reflection: reflectionDraft }));
    setToast('Refleksi tersimpan di browser ini ✓');
  }

  return (
    <div className="app-shell">
      <Topbar
        points={state.points}
        onNavigateHome={() => navigate('home')}
        onReset={resetProgress}
      />

      <div className="layout">
        <Sidebar page={page} onNavigate={navigate} />

        <main className="main-content">
          {page === 'home' && (
            <Home
              state={state}
              completedCount={completedCount}
              openLesson={openLesson}
              navigate={navigate}
              startDiagnostic={startDiagnostic}
            />
          )}

          {page === 'dashboard' && (
            <Dashboard
              state={state}
              completedCount={completedCount}
              totalProgress={totalProgress}
              openLesson={openLesson}
              startDiagnostic={startDiagnostic}
            />
          )}

          {page === 'diagnostic' && (
            <Diagnostic
              answers={diagAnswers}
              setAnswers={setDiagAnswers}
              index={diagIndex}
              setIndex={setDiagIndex}
              result={diagResult || (state.diagnostic.completed ? state.diagnostic : null)}
              onSubmit={submitDiagnostic}
              onRetake={() => {
                setDiagResult(null);
                setDiagAnswers({});
                setDiagIndex(0);
                setState(prev => ({ ...prev, diagnostic: { ...prev.diagnostic, completed: false } }));
              }}
              navigate={navigate}
            />
          )}

          {page === 'path' && (
            <Path state={state} setState={setState} openLesson={openLesson} />
          )}

          {page === 'lesson' && (
            <Lesson
              key={currentModule.id}
              module={currentModule}
              index={modules.findIndex(m => m.id === currentModule.id)}
              level={state.level}
              setLevel={lvl => setState(prev => ({ ...prev, level: lvl }))}
              progress={currentProgress}
              answer={lessonAnswer[currentModule.id]}
              setAnswer={value => setLessonAnswer(prev => ({ ...prev, [currentModule.id]: value }))}
              feedback={feedback[currentModule.id]}
              clearFeedback={() => setFeedback(prev => ({ ...prev, [currentModule.id]: undefined }))}
              checkLesson={checkLesson}
              patchModule={patchModule}
              openLesson={openLesson}
              navigate={navigate}
              setToast={setToast}
            />
          )}

          {page === 'reflection' && (
            <Reflection
              value={reflectionDraft}
              setValue={setReflectionDraft}
              onSave={saveReflection}
            />
          )}
        </main>
      </div>

      <Footer />
      <Toast message={toast} />
    </div>
  );
}
