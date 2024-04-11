import * as actions from "./authActionsTypes";

export const loginUser = (payload) => {
  return { type: actions.LOGIN_DETAILS, payload };
};

export const logout = () => {
  return { type: actions.LOG_OUT };
};

export const onboardingUser = (payload) => {
  return { type: actions.ONBOARDING_DETAILS, payload };
};

export const clearOnboarding = () => {
  return { type: actions.CLEAR_ONBOARDING };
};

export const checkProfile = (payload) => {
  return { type: actions.CHECK_PROFILE_DETAILS, payload };
};

export const clearProfile = () => {
  return { type: actions.CLEAR_PROFILE };
};

export const resetPassword = (payload) => {
  return { type: actions.RESET_PASSWORD_DETAILS, payload };
};

export const resetUserEmail = (payload) => {
  return { type: actions.RESET_USER_EMAIL, payload };
};

export const clearResetPassword = () => {
  return { type: actions.CLEAR_RESET_PASSWORD };
};

export const clearResetUserEmail = () => {
  return { type: actions.CLEAR_RESET_USER_EMAIL };
};

export const forgotPassword = (payload) => {
  return { type: actions.FORGOT_PASSWORD_DETAILS, payload };
};

export const clearForgotPassword = () => {
  return { type: actions.CLEAR_FORGOT_PASSWORD };
};

export const publications = (payload) => {
  return { type: actions.PUBLICATION_DETAILS, payload };
};

export const verifyAccount = (payload) => {
  return { type: actions.VERIFY_ACCOUNT_DETAILS, payload };
};

export const clearVerifyAccount = () => {
  return { type: actions.CLEAR_VERIFY_ACCOUNT };
};

export const grantsDetails = (payload) => {
  return { type: actions.GRANTS_DETAILS, payload };
};

export const fundingDetails = (payload) => {
  return { type: actions.FUNDING_DETAILS, payload };
};

export const recommendation = (payload) => {
  return { type: actions.RECOMMENDATION_DETAILS, payload };
};

export const clearRecommendation = () => {
  return { type: actions.CLEAR_RECOMMENDATION };
};

export const users = (payload) => {
  return { type: actions.GET_USERS_DETAILS, payload };
};

export const previewProfile = (payload) => {
  return { type: actions.PREVIEW_PROFILE_DETAILS, payload };
};

export const previewPublications = (payload) => {
  return { type: actions.PREVIEW_PUBLICATION_DETAILS, payload };
};

export const clearPreviewProfile = () => {
  return { type: actions.CLEAR_PREVIEW_PROFILE };
};

export const clearPreviewPublications = () => {
  return { type: actions.CLEAR_PREVIEW_PUBLICATIONS };
};

export const performConnection = (payload) => {
  return { type: actions.CONNECTION_DETAILS, payload };
};

export const notificationDetails = (payload) => {
  return { type: actions.NOTIFICATION_DETAILS, payload };
};

export const confirmationDetails = (payload) => {
  return { type: actions.CONFIRMATION_DETAILS, payload };
};

export const btnAcceptOrReject = (payload) => {
  return { type: actions.BTN_ACCEPT_OR_REJECT, payload };
};

export const clearBtnAcceptOrReject = (payload) => {
  return { type: actions.CLEAR_BTN_ACCEPT_OR_REJECT, payload };
};

export const previewConfirmationDetails = (payload) => {
  return { type: actions.PREVIEW_CONFIRMATION_DETAILS, payload };
};

export const grantsSaveOrUpdateDetails = (payload) => {
  return { type: actions.GRANTS_SAVE_OR_UPDATE_DETAILS, payload };
};

export const fileUploadDetails = (payload) => {
  return { type: actions.FILE_UPLOAD_DETAILS, payload };
};

export const clearFileUpload = () => {
  return { type: actions.CLEAR_FILE_UPLOAD };
};

export const messageDetails = (payload) => {
  return { type: actions.MESSAGE_DEATAILS, payload };
};

export const clearMessage = () => {
  return { type: actions.CLEAR_MESSAGE };
};

export const activateOrDeactivateDetails = (payload) => {
  return { type: actions.ACTIVATE_OR_DEACTIVATE_DETAILS, payload };
};

export const clearActivation = () => {
  return { type: actions.CLEAR_ACTIVATION };
};

export const setUserArrayDetails = (payload) => {
  return { type: actions.USER_ARRAY, payload };
};

export const ratingDetails = (payload) => {
  return { type: actions.RATING_DETAILS, payload };
};

export const deleteOrVerifyUserDetails = (payload) => {
  return { type: actions.DELETE_OR_VERIFY_USER_DETAILS, payload };
};

export const clearDeleteOrVerifyUser = () => {
  return { type: actions.CLEAR_DELETE_OR_VERIFY_USER };
};

export const previewUserRatingDetails = (payload) => {
  return { type: actions.PREVIEW_USER_RATING_DEATILS, payload };
};

export const clearPreviewUserRating = () => {
  return { type: actions.CLEAR_PREVIEW_USER_RATING };
};

export const previewUserFundingDetails = (payload) => {
  return { type: actions.PREVIEW_USER_FUNDING_DEATILS, payload };
};

export const clearPreviewUserFunding = () => {
  return { type: actions.CLEAR_PREVIEW_USER_FUNDING };
};

export const storeRemakeConnection = (payload) => {
  return { type: actions.REMAKE_CONNECTION, payload };
};

export const disconnectConnection = (payload) => {
  return { type: actions.DISCONNECT_DETAILS, payload };
};

export const createCollaborator = (payload) => {
  return { type: actions.CTEATE_COLLABORATOR_DETAILS, payload };
};

export const getCollaborators = (payload) => {
  return { type: actions.GET_COLLABORATORS_DETAILS, payload };
};

export const getPreviewCollaborators = (payload) => {
  return { type: actions.GET_PREVIEW_COLLABORATORS_DETAILS, payload };
};

export const shareGrants = (payload) => {
  return { type: actions.SHARE_GRANTS_DETAILS, payload };
};

export const upcomings = (payload) => {
  return { type: actions.UPCOMINGS_DETAILS, payload };
};
