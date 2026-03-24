import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: any;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: any): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      let errorMessage = "Something went wrong.";
      const error = this.state.error;
      if (error && error.message) {
        try {
          const parsedError = JSON.parse(error.message);
          if (parsedError.error) {
            errorMessage = `Firestore Error: ${parsedError.error} (${parsedError.operationType} on ${parsedError.path})`;
          }
        } catch (e) {
          errorMessage = error.message;
        }
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f7ff] p-6">
          <div className="glass-card p-10 rounded-3xl max-w-lg w-full text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Application Error</h2>
            <p className="text-black/60 mb-8 leading-relaxed">
              {errorMessage}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-black/80 transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
