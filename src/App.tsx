import { ThemeMenu } from './components/theme-menu';
import { HomePage } from './pages/home-page';

function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <span className="text-lg font-bold tracking-tight text-text">Prompt Loader</span>
          <ThemeMenu />
        </div>
      </header>
      <HomePage />
    </div>
  );
}

export default App;
