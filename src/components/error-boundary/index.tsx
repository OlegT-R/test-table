import React from 'react';

interface IState {
  hasError: boolean;
}

interface IAppProps {
  children: React.ReactNode;
}

export default class ErrorBoundary extends React.PureComponent<IAppProps, IState> {
  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public state = {
    hasError: false,
  };

  public componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log('--DidCatch--', error, info);
    // logging error to remote server
  }

  public render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div>
          Sorry, the website is under technical works. Please try again later.
        </div>
      );
    }

    return children;
  }
}
