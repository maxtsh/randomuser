import { Component, ErrorInfo, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  errorMessage: string;
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      errorMessage: "",
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState((prev) => ({ ...prev, errorMessage: error.message }));
    console.log("ERROR ===>", error, "\n", "===> ERROR INFO ===>", errorInfo);
  }

  handleReset = () => {
    this.setState((prev) => ({ ...prev, hasError: false }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h3 className="error-title">Ooooooppps...!</h3>
          <p className="error-text">
            {this?.state.errorMessage || "Something must have broken!"}
          </p>
          <button onClick={this.handleReset}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
