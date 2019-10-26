export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function loadSubscriptionsRequest() {
  return {
    type: '@user/LOAD_SUBSCRIPTIONS_REQUEST',
  };
}

export function loadSubscriptionsSuccess(subscriptions) {
  return {
    type: '@user/LOAD_SUBSCRIPTIONS_SUCCESS',
    payload: { subscriptions },
  };
}

export function subscribeOnMeetupRequest(meetup) {
  return {
    type: '@user/SUBSCRIBE_ON_MEETUP_REQUEST',
    payload: { meetup },
  };
}

export function subscribeOnMeetupSuccess(meetup) {
  return {
    type: '@user/SUBSCRIBE_ON_MEETUP_SUCCESS',
    payload: { meetup },
  };
}
