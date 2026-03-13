import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full space-y-8 p-12 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl">
            <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-500">
              <ShieldAlert size={40} />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-display font-black text-white">System Interrupted</h2>
              <p className="text-white/40 font-light leading-relaxed">
                The neural core encountered an unexpected anomaly. We've isolated the process to prevent further instability.
              </p>
            </div>
            <button
              onClick={this.handleReset}
              className="w-full py-4 rounded-xl bg-white text-black font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <RefreshCcw size={16} />
              Reboot System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
