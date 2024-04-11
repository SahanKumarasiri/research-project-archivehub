import { put, takeLatest, call } from "redux-saga/effects";
import * as actions from "./authActionsTypes";
import { api } from "../api/commonAPI";
import axios from "axios";
import { notification } from "antd";

export const loginUser = function* ({ payload }) {
  try {
    const result = yield call(api.loginUser, payload);
    localStorage.setItem("authToken", result?.data?.token);
    yield put({
      type: actions.LOGIN_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.LOGIN_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const onboardingUser = function* ({ payload }) {
  try {
    const result = yield call(api.onboardingUser, payload);
    yield put({
      type: actions.ONBOARDING_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.ONBOARDING_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const checkProfile = function* ({ payload }) {
  try {
    const result = yield call(api.checkProfile, payload);
    yield put({
      type: actions.CHECK_PROFILE_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.CHECK_PROFILE_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const resetPassword = function* ({ payload }) {
  try {
    const result = yield call(api.resetPassword, payload);
    yield put({
      type: actions.RESET_PASSWORD_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.RESET_PASSWORD_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const forgotPassword = function* ({ payload }) {
  try {
    const result = yield call(api.forgotPassword, payload);
    yield put({
      type: actions.FORGOT_PASSWORD_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.FORGOT_PASSWORD_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const publications = function* ({ payload }) {
  try {
    const result = yield call(api.publications, payload);
    yield put({
      type: actions.PUBLICATION_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.PUBLICATION_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const verifyAccount = function* ({ payload }) {
  try {
    const result = yield call(api.verifyAccount, payload);
    yield put({
      type: actions.VERIFY_ACCOUNT_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.VERIFY_ACCOUNT_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const grants = function* ({ payload }) {
  try {
    const result = yield call(api.grants, payload);
    yield put({
      type: actions.GRANTS_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.GRANTS_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};
export const funding = function* ({ payload }) {
  try {
    const result = yield call(api.funding, payload);
    yield put({
      type: actions.FUNDING_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.FUNDING_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const recommendation = function* ({ payload }) {
  try {
    const result = yield call(api.recommendation, payload);
    if (payload.type === "PERSONALIZED") {
      yield put({
        type: actions.PERSONALIZED_RECOMMENDATION_DETAILS_SUCCESS,
        payload: result,
      });
    } else
      yield put({
        type: actions.RECOMMENDATION_DETAILS_SUCCESS,
        payload: result,
      });
  } catch (e) {
    yield put({
      type: actions.RECOMMENDATION_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const users = function* ({ payload }) {
  try {
    const result = yield call(api.users, payload);
    yield put({
      type: actions.GET_USERS_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.GET_USERS_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const previewProfile = function* ({ payload }) {
  try {
    const result = yield call(api.checkProfile, payload);
    yield put({
      type: actions.PREVIEW_PROFILE_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.PREVIEW_PROFILE_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const previewPublications = function* ({ payload }) {
  try {
    const result = yield call(api.publications, payload);
    yield put({
      type: actions.PREVIEW_PUBLICATION_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.PREVIEW_PUBLICATION_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const connection = function* ({ payload }) {
  try {
    const result = yield call(api.connection, payload);
    yield put({
      type: actions.CONNECTION_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.CONNECTION_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const notifications = function* ({ payload }) {
  try {
    const result = yield call(api.connection, payload);
    yield put({
      type: actions.NOTIFICATION_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.NOTIFICATION_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const confirmation = function* ({ payload }) {
  try {
    const result = yield call(api.connection, payload);
    yield put({
      type: actions.CONFIRMATION_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.CONFIRMATION_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const previewConfirmation = function* ({ payload }) {
  try {
    const result = yield call(api.connection, payload);
    yield put({
      type: actions.PREVIEW_CONFIRMATION_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.PREVIEW_CONFIRMATION_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const grantsSaveOrUpdate = function* ({ payload }) {
  try {
    const result = yield call(api.grantsSaveOrUpdate, payload);
    yield put({
      type: actions.GRANTS_SAVE_OR_UPDATE_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.GRANTS_SAVE_OR_UPDATE_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

const uploadFile = (details) => {
  //Without interceptor axios call
  return axios.put(details?.signedUrl, details?.obj).then(() =>
    notification.success({
      message: "File uploaded successfully",
      placement: "topRight",
    })
  );
};

export const fileUpload = function* ({
  payload: { file, userId, originFile },
}) {
  try {
    const result = yield call(api.fileUpload, file, userId);
    yield put({
      type: actions.FILE_UPLOAD_DETAILS_SUCCESS,
      payload: result,
    });
    yield call(uploadFile, {
      signedUrl: result?.data?.signedUrl,
      obj: originFile,
    });
  } catch (e) {
    yield put({
      type: actions.FILE_UPLOAD_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const message = function* ({ payload }) {
  try {
    const result = yield call(api.message, payload);
    yield put({
      type: actions.MESSAGE_DEATAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.MESSAGE_DEATAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const activation = function* ({ payload }) {
  try {
    const result = yield call(api.activation, payload);
    yield put({
      type: actions.ACTIVATE_OR_DEACTIVATE_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.ACTIVATE_OR_DEACTIVATE_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const rating = function* ({ payload }) {
  try {
    const result = yield call(api.rating, payload);
    yield put({
      type: actions.RATING_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.RATING_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const previewUserRating = function* ({ payload }) {
  try {
    const result = yield call(api.rating, payload);
    yield put({
      type: actions.PREVIEW_USER_RATING_DEATILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.PREVIEW_USER_RATING_DEATILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};
export const previewUserFunding = function* ({ payload }) {
  try {
    const result = yield call(api.funding, payload);
    yield put({
      type: actions.PREVIEW_USER_FUNDING_DEATILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.PREVIEW_USER_FUNDING_DEATILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const deleteOrVerifyUser = function* ({ payload }) {
  try {
    const result = yield call(api.deleteOrVerifyUser, payload);
    yield put({
      type: actions.DELETE_OR_VERIFY_USER_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.DELETE_OR_VERIFY_USER_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const disconnect = function* ({ payload }) {
  try {
    const result = yield call(api.disconnect, payload);
    yield put({
      type: actions.DISCONNECT_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.DISCONNECT_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const createCollaborator = function* ({ payload }) {
  try {
    const result = yield call(api.collaborator, payload);
    yield put({
      type: actions.CTEATE_COLLABORATOR_DETAILS_SUCCESS,
      payload: result,
    });
    notification.success({
      message: "Collaborator created successfully.",
      placement: "topRight",
    });
  } catch (e) {
    yield put({
      type: actions.CTEATE_COLLABORATOR_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const getCollaborators = function* ({ payload }) {
  try {
    const result = yield call(api.collaborator, payload);
    yield put({
      type: actions.GET_COLLABORATORS_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.GET_COLLABORATORS_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const getPreviewCollaborators = function* ({ payload }) {
  try {
    const result = yield call(api.collaborator, payload);
    yield put({
      type: actions.GET_PREVIEW_COLLABORATORS_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.GET_PREVIEW_COLLABORATORS_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const shareGrants = function* ({ payload }) {
  try {
    const result = yield call(api.shareGrants, payload);
    yield put({
      type: actions.SHARE_GRANTS_DETAILS_SUCCESS,
      payload: result,
    });
    notification.success({
      message: "Grants shared successfully.",
      placement: "topRight",
    });
  } catch (e) {
    yield put({
      type: actions.SHARE_GRANTS_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const upcomings = function* ({ payload }) {
  try {
    const result = yield call(api.upcomings, payload);
    yield put({
      type: actions.UPCOMINGS_DETAILS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.UPCOMINGS_DETAILS_FAILED,
      message: e?.response?.data,
      code: e?.response?.status,
    });
  }
};

export const authSagaWrapper = function* () {
  yield* [
    takeLatest(actions.LOGIN_DETAILS, loginUser),
    takeLatest(actions.ONBOARDING_DETAILS, onboardingUser),
    takeLatest(actions.CHECK_PROFILE_DETAILS, checkProfile),
    takeLatest(actions.RESET_PASSWORD_DETAILS, resetPassword),
    takeLatest(actions.FORGOT_PASSWORD_DETAILS, forgotPassword),
    takeLatest(actions.PUBLICATION_DETAILS, publications),
    takeLatest(actions.VERIFY_ACCOUNT_DETAILS, verifyAccount),
    takeLatest(actions.GRANTS_DETAILS, grants),
    takeLatest(actions.FUNDING_DETAILS, funding),
    takeLatest(actions.RECOMMENDATION_DETAILS, recommendation),
    takeLatest(actions.GET_USERS_DETAILS, users),
    takeLatest(actions.PREVIEW_PROFILE_DETAILS, previewProfile),
    takeLatest(actions.PREVIEW_PUBLICATION_DETAILS, previewPublications),
    takeLatest(actions.CONNECTION_DETAILS, connection),
    takeLatest(actions.NOTIFICATION_DETAILS, notifications),
    takeLatest(actions.CONFIRMATION_DETAILS, confirmation),
    takeLatest(actions.PREVIEW_CONFIRMATION_DETAILS, previewConfirmation),
    takeLatest(actions.GRANTS_SAVE_OR_UPDATE_DETAILS, grantsSaveOrUpdate),
    takeLatest(actions.FILE_UPLOAD_DETAILS, fileUpload),
    takeLatest(actions.MESSAGE_DEATAILS, message),
    takeLatest(actions.ACTIVATE_OR_DEACTIVATE_DETAILS, activation),
    takeLatest(actions.RATING_DETAILS, rating),
    takeLatest(actions.DELETE_OR_VERIFY_USER_DETAILS, deleteOrVerifyUser),
    takeLatest(actions.PREVIEW_USER_RATING_DEATILS, previewUserRating),
    takeLatest(actions.PREVIEW_USER_FUNDING_DEATILS, previewUserFunding),
    takeLatest(actions.DISCONNECT_DETAILS, disconnect),
    takeLatest(actions.CTEATE_COLLABORATOR_DETAILS, createCollaborator),
    takeLatest(actions.GET_COLLABORATORS_DETAILS, getCollaborators),
    takeLatest(
      actions.GET_PREVIEW_COLLABORATORS_DETAILS,
      getPreviewCollaborators
    ),
    takeLatest(actions.SHARE_GRANTS_DETAILS, shareGrants),
    takeLatest(actions.UPCOMINGS_DETAILS, upcomings),
  ];
};
