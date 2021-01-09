import { all } from 'redux-saga/effects';
import authSagas from './common';

export default function* rootSaga(getState) {
  yield all([
    authSagas()
  ]);
}
