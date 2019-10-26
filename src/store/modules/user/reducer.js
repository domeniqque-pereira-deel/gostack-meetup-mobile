import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  subscriptions: [],
  loadingSubscriptions: false,
};

export default function User(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        draft.subscriptions = [];
        break;
      }
      case '@user/LOAD_SUBSCRIPTIONS_REQUEST': {
        draft.loadingSubscriptions = true;
        break;
      }
      case '@user/LOAD_SUBSCRIPTIONS_SUCCESS': {
        draft.subscriptions = action.payload.subscriptions;
        draft.loadingSubscriptions = false;
        break;
      }
      case '@user/SUBSCRIBE_ON_MEETUP_SUCCESS': {
        draft.subscriptions.push(action.payload.meetup);
        break;
      }
      default:
    }
  });
}
