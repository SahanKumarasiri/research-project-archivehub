import * as actions from "./authActionsTypes";

export const authReducer = (
  state = {
    login: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    onboarding: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    checkProfile: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    resetPassword: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    resetUserEmail: null,
    forgotPassword: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    publications: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    verifyAccount: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    grants: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    funding: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    recommendation: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    personalizedRecommendation: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    users: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    previewProfile: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    previewPublications: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    connection: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    notifications: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    confirmation: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    btnAcceptOrReject: null,
    previewConfirmation: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    grantsSaveOrUpdate: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    files: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    message: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    activation: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    userArray: [],
    rating: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    deleteOrVerifyUser: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    previewUserRating: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    previewUserFunding: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    remakeConnection: [],
    disconnect: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    collaborator: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    getCollaborators: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    getPreviewCollaborators: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    shareGrants: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
    upcomings: {
      fetching: false,
      error: { status: false, message: "" },
      success: { status: false, message: "" },
      data: [],
    },
  },
  action
) => {
  switch (action.type) {
    case actions.LOGIN_DETAILS:
      return {
        ...state,
        login: {
          ...state.login,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.LOGIN_DETAILS_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.LOGIN_DETAILS_FAILED:
      return {
        ...state,
        login: {
          ...state.login,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.LOG_OUT:
      localStorage.clear();
      return {
        ...state.login,
        fetching: false,
        error: { status: true, message: "" },
        success: { status: false, message: "" },
      };

    case actions.ONBOARDING_DETAILS:
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          fetching: true,
          error: { status: false, message: "" },
          success: { status: false, message: "" },
        },
      };
    case actions.ONBOARDING_DETAILS_SUCCESS:
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.ONBOARDING_DETAILS_FAILED:
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.CLEAR_ONBOARDING:
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          fetching: false,
          error: { status: false, message: "" },
          data: [],
        },
      };

    case actions.CHECK_PROFILE_DETAILS:
      return {
        ...state,
        checkProfile: {
          ...state.checkProfile,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.CHECK_PROFILE_DETAILS_SUCCESS:
      return {
        ...state,
        checkProfile: {
          ...state.checkProfile,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.CHECK_PROFILE_DETAILS_FAILED:
      return {
        ...state,
        checkProfile: {
          ...state.checkProfile,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };

    case actions.CLEAR_PROFILE:
      return {
        ...state,
        checkProfile: {
          ...state.checkProfile,
          fetching: false,
          error: { status: false, message: "" },
          data: [],
        },
      };

    case actions.RESET_PASSWORD_DETAILS:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.RESET_PASSWORD_DETAILS_SUCCESS:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.RESET_PASSWORD_DETAILS_FAILED:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };

    case actions.RESET_USER_EMAIL:
      return {
        ...state,
        resetUserEmail: action.payload,
      };

    case actions.CLEAR_RESET_PASSWORD:
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          fetching: false,
          error: { status: false, message: "" },
          data: [],
        },
      };

    case actions.CLEAR_RESET_USER_EMAIL:
      return {
        ...state,
        resetUserEmail: null,
      };

    case actions.FORGOT_PASSWORD_DETAILS:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.FORGOT_PASSWORD_DETAILS_SUCCESS:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.FORGOT_PASSWORD_DETAILS_FAILED:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };

    case actions.CLEAR_FORGOT_PASSWORD:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          fetching: false,
          error: { status: false, message: "" },
          data: [],
        },
      };

    case actions.PUBLICATION_DETAILS:
      return {
        ...state,
        publications: {
          ...state.publications,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.PUBLICATION_DETAILS_SUCCESS:
      return {
        ...state,
        publications: {
          ...state.publications,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.PUBLICATION_DETAILS_FAILED:
      return {
        ...state,
        publications: {
          ...state.publications,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.VERIFY_ACCOUNT_DETAILS:
      return {
        ...state,
        verifyAccount: {
          ...state.verifyAccount,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.VERIFY_ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        verifyAccount: {
          ...state.verifyAccount,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.VERIFY_ACCOUNT_DETAILS_FAILED:
      return {
        ...state,
        verifyAccount: {
          ...state.verifyAccount,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.CLEAR_VERIFY_ACCOUNT:
      return {
        ...state,
        verifyAccount: {
          ...state.verifyAccount,
          fetching: false,
          error: { status: false, message: "" },
          data: [],
        },
      };
    case actions.GRANTS_DETAILS:
      return {
        ...state,
        grants: {
          ...state.grants,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.GRANTS_DETAILS_SUCCESS:
      return {
        ...state,
        grants: {
          ...state.grants,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.GRANTS_DETAILS_FAILED:
      return {
        ...state,
        grants: {
          ...state.grants,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.FUNDING_DETAILS:
      return {
        ...state,
        funding: {
          ...state.funding,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.FUNDING_DETAILS_SUCCESS:
      return {
        ...state,
        funding: {
          ...state.funding,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.FUNDING_DETAILS_FAILED:
      return {
        ...state,
        funding: {
          ...state.funding,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.RECOMMENDATION_DETAILS:
      return {
        ...state,
        recommendation: {
          ...state.recommendation,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.RECOMMENDATION_DETAILS_SUCCESS:
      return {
        ...state,
        recommendation: {
          ...state.recommendation,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.PERSONALIZED_RECOMMENDATION_DETAILS_SUCCESS:
      return {
        ...state,
        personalizedRecommendation: {
          ...state.personalizedRecommendation,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.RECOMMENDATION_DETAILS_FAILED:
      return {
        ...state,
        recommendation: {
          ...state.recommendation,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.CLEAR_RECOMMENDATION:
      return {
        ...state,
        recommendation: {
          ...state.recommendation,
          fetching: false,
          error: { status: false, message: "" },
          data: [],
        },
      };
    case actions.GET_USERS_DETAILS:
      return {
        ...state,
        users: {
          ...state.users,
          fetching: true,
          error: { status: false, message: "" },
          success: { status: false, message: "" },
        },
      };
    case actions.GET_USERS_DETAILS_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.GET_USERS_DETAILS_FAILED:
      return {
        ...state,
        users: {
          ...state.users,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.PREVIEW_PROFILE_DETAILS:
      return {
        ...state,
        previewProfile: {
          ...state.previewProfile,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.PREVIEW_PROFILE_DETAILS_SUCCESS:
      return {
        ...state,
        previewProfile: {
          ...state.previewProfile,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.PREVIEW_PROFILE_DETAILS_FAILED:
      return {
        ...state,
        previewProfile: {
          ...state.previewProfile,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.PREVIEW_PUBLICATION_DETAILS:
      return {
        ...state,
        previewPublications: {
          ...state.previewPublications,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.PREVIEW_PUBLICATION_DETAILS_SUCCESS:
      return {
        ...state,
        previewPublications: {
          ...state.previewPublications,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.PREVIEW_PUBLICATION_DETAILS_FAILED:
      return {
        ...state,
        previewPublications: {
          ...state.previewPublications,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.CLEAR_PREVIEW_PROFILE:
      return {
        ...state,
        previewProfile: {
          ...state.previewProfile,
          fetching: false,
          error: { status: false, message: "" },
          data: [],
        },
      };
    case actions.CLEAR_PREVIEW_PUBLICATIONS:
      return {
        ...state,
        previewPublications: {
          ...state.previewPublications,
          fetching: false,
          error: { status: false, message: "" },
          data: [],
        },
      };
    case actions.CONNECTION_DETAILS:
      return {
        ...state,
        connection: {
          ...state.connection,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.CONNECTION_DETAILS_SUCCESS:
      return {
        ...state,
        connection: {
          ...state.connection,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.CONNECTION_DETAILS_FAILED:
      return {
        ...state,
        connection: {
          ...state.connection,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.NOTIFICATION_DETAILS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.NOTIFICATION_DETAILS_SUCCESS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.NOTIFICATION_DETAILS_FAILED:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.CONFIRMATION_DETAILS:
      return {
        ...state,
        confirmation: {
          ...state.confirmation,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.CONFIRMATION_DETAILS_SUCCESS:
      return {
        ...state,
        confirmation: {
          ...state.confirmation,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.CONFIRMATION_DETAILS_FAILED:
      return {
        ...state,
        confirmation: {
          ...state.confirmation,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.BTN_ACCEPT_OR_REJECT:
      return {
        ...state,
        btnAcceptOrReject: action.payload,
      };
    case actions.CLEAR_BTN_ACCEPT_OR_REJECT:
      return {
        ...state,
        btnAcceptOrReject: null,
      };
    case actions.PREVIEW_CONFIRMATION_DETAILS:
      return {
        ...state,
        previewConfirmation: {
          ...state.previewConfirmation,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.PREVIEW_CONFIRMATION_DETAILS_SUCCESS:
      return {
        ...state,
        previewConfirmation: {
          ...state.previewConfirmation,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.PREVIEW_CONFIRMATION_DETAILS_FAILED:
      return {
        ...state,
        previewConfirmation: {
          ...state.previewConfirmation,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.GRANTS_SAVE_OR_UPDATE_DETAILS:
      return {
        ...state,
        grantsSaveOrUpdate: {
          ...state.grantsSaveOrUpdate,
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.GRANTS_SAVE_OR_UPDATE_DETAILS_SUCCESS:
      return {
        ...state,
        grantsSaveOrUpdate: {
          ...state.grantsSaveOrUpdate,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.GRANTS_SAVE_OR_UPDATE_DETAILS_FAILED:
      return {
        ...state,
        grantsSaveOrUpdate: {
          ...state.grantsSaveOrUpdate,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.FILE_UPLOAD_DETAILS:
      return {
        ...state,
        files: {
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.FILE_UPLOAD_DETAILS_SUCCESS:
      return {
        ...state,
        files: {
          ...state.files,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.FILE_UPLOAD_DETAILS_FAILED:
      return {
        ...state,
        files: {
          ...state.files,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.CLEAR_FILE_UPLOAD:
      return {
        ...state,
        files: {},
      };
    case actions.MESSAGE_DEATAILS:
      return {
        ...state,
        message: {
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.MESSAGE_DEATAILS_SUCCESS:
      return {
        ...state,
        message: {
          ...state.message,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.MESSAGE_DEATAILS_FAILED:
      return {
        ...state,
        message: {
          ...state.message,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.CLEAR_MESSAGE:
      return {
        ...state,
        message: {},
      };
    case actions.ACTIVATE_OR_DEACTIVATE_DETAILS:
      return {
        ...state,
        activation: {
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.ACTIVATE_OR_DEACTIVATE_DETAILS_SUCCESS:
      return {
        ...state,
        activation: {
          ...state.activation,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.ACTIVATE_OR_DEACTIVATE_DETAILS_FAILED:
      return {
        ...state,
        activation: {
          ...state.activation,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.CLEAR_ACTIVATION:
      return {
        ...state,
        activation: {},
      };
    case actions.USER_ARRAY:
      return {
        ...state,
        userArray: action.payload,
      };
    case actions.RATING_DETAILS:
      return {
        ...state,
        rating: {
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.RATING_DETAILS_SUCCESS:
      return {
        ...state,
        rating: {
          ...state.rating,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.RATING_DETAILS_FAILED:
      return {
        ...state,
        rating: {
          ...state.rating,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.DELETE_OR_VERIFY_USER_DETAILS:
      return {
        ...state,
        deleteOrVerifyUser: {
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.DELETE_OR_VERIFY_USER_DETAILS_SUCCESS:
      return {
        ...state,
        deleteOrVerifyUser: {
          ...state.deleteOrVerifyUser,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.DELETE_OR_VERIFY_USER_DETAILS_FAILED:
      return {
        ...state,
        deleteOrVerifyUser: {
          ...state.deleteOrVerifyUser,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.CLEAR_DELETE_OR_VERIFY_USER:
      return {
        ...state,
        deleteOrVerifyUser: null,
      };
    case actions.PREVIEW_USER_RATING_DEATILS:
      return {
        ...state,
        previewUserRating: {
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.PREVIEW_USER_RATING_DEATILS_SUCCESS:
      return {
        ...state,
        previewUserRating: {
          ...state.previewUserRating,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.PREVIEW_USER_RATING_DEATILS_FAILED:
      return {
        ...state,
        previewUserRating: {
          ...state.previewUserRating,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.CLEAR_PREVIEW_USER_RATING:
      return {
        ...state,
        previewUserRating: null,
      };
    case actions.PREVIEW_USER_FUNDING_DEATILS:
      return {
        ...state,
        previewUserFunding: {
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.PREVIEW_USER_FUNDING_DEATILS_SUCCESS:
      return {
        ...state,
        previewUserFunding: {
          ...state.previewUserFunding,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.PREVIEW_USER_FUNDING_DEATILS_FAILED:
      return {
        ...state,
        previewUserFunding: {
          ...state.previewUserFunding,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.CLEAR_PREVIEW_USER_FUNDING:
      return {
        ...state,
        previewUserFunding: null,
      };
    case actions.REMAKE_CONNECTION:
      return {
        ...state,
        remakeConnection: action.payload,
      };
    case actions.DISCONNECT_DETAILS:
      return {
        ...state,
        disconnect: {
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.DISCONNECT_DETAILS_SUCCESS:
      return {
        ...state,
        disconnect: {
          ...state.disconnect,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.DISCONNECT_DETAILS_FAILED:
      return {
        ...state,
        disconnect: {
          ...state.disconnect,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.CTEATE_COLLABORATOR_DETAILS:
      return {
        ...state,
        collaborator: {
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.CTEATE_COLLABORATOR_DETAILS_SUCCESS:
      return {
        ...state,
        collaborator: {
          ...state.collaborator,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.CTEATE_COLLABORATOR_DETAILS_FAILED:
      return {
        ...state,
        collaborator: {
          ...state.collaborator,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.GET_COLLABORATORS_DETAILS:
      return {
        ...state,
        getCollaborators: {
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.GET_COLLABORATORS_DETAILS_SUCCESS:
      return {
        ...state,
        getCollaborators: {
          ...state.getCollaborators,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.GET_COLLABORATORS_DETAILS_FAILED:
      return {
        ...state,
        getCollaborators: {
          ...state.getCollaborators,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.GET_PREVIEW_COLLABORATORS_DETAILS:
      return {
        ...state,
        getPreviewCollaborators: {
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.GET_PREVIEW_COLLABORATORS_DETAILS_SUCCESS:
      return {
        ...state,
        getPreviewCollaborators: {
          ...state.getPreviewCollaborators,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.GET_PREVIEW_COLLABORATORS_DETAILS_FAILED:
      return {
        ...state,
        getPreviewCollaborators: {
          ...state.getPreviewCollaborators,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.SHARE_GRANTS_DETAILS:
      return {
        ...state,
        shareGrants: {
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.SHARE_GRANTS_DETAILS_SUCCESS:
      return {
        ...state,
        shareGrants: {
          ...state.shareGrants,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.SHARE_GRANTS_DETAILS_FAILED:
      return {
        ...state,
        shareGrants: {
          ...state.shareGrants,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    case actions.UPCOMINGS_DETAILS:
      return {
        ...state,
        upcomings: {
          fetching: true,
          error: { status: false, message: "" },
        },
      };
    case actions.UPCOMINGS_DETAILS_SUCCESS:
      return {
        ...state,
        upcomings: {
          ...state.upcomings,
          fetching: false,
          data: action.payload,
          error: { status: false, message: "" },
          success: { status: true, message: "" },
        },
      };
    case actions.UPCOMINGS_DETAILS_FAILED:
      return {
        ...state,
        upcomings: {
          ...state.upcomings,
          fetching: false,
          error: { status: true, message: action.message },
          success: { status: false, message: "" },
        },
      };
    default:
      return state;
  }
};
