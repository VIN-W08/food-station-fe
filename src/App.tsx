/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { ProgressIndicator } from './components/common/ProgressIndicator';
import { Toast } from './components/common/Toast';
import { View } from './components/common/View';
import { Colors } from './design/Colors';
import { uiActions } from './features/uiSlice';
import { refreshToken, userActions } from './features/userSlice';
import { createStyles } from './hooks/createStyles';
import { AppRouter } from './router/AppRouter';
import { LocalStorageService } from './services/LocalStorageService';

function App() {
  const { isLoading, toast } = useAppSelector((state) => state.ui)
  const { isLoggedIn } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const currentToken = LocalStorageService.getAccessToken()
    if (currentToken !== '') {
      dispatch(userActions.setUser(LocalStorageService.getUser()))
    }
    if (!isLoggedIn) return
    const refreshInterval = setInterval(() => dispatch(refreshToken()), 30000)
    return () => {
      clearInterval(refreshInterval)
    }
  }, [isLoggedIn])

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <View className="App" css={styles.app}>
        {isLoading && <ProgressIndicator />}
        <Toast
          open={toast.show}
          message={toast.message}
          onClose={() => dispatch(uiActions.hideToast())}
        />
        <AppRouter />
      </View>
    </>
  );
}

const styles = createStyles({
  app: {
    boxSizing: 'border-box',
    overflow: 'scroll',
    backgroundColor: Colors.AntiFlashWhite
  }
})

export default App;
