const INITIAL_STATE = {
  loading: false,
  loadingImage: false,
  error: false,
  people: [],
  person: null,
  page: 0,
  totalCount: 0,
  me: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_APPLICANTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "GET_APPLICANTS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        people: action.payload.applicants,
        totalCount: action.payload.count,
        limit: action.payload.limit,
      };
    case "GET_APPLICANTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "GET_APPLICANT_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "GET_APPLICANT_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        person: action.payload,
      };
    case "GET_APPLICANT_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "DELETE_APPLICANT_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "DELETE_APPLICANT_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        people: state.people.map((person) => {
          if (person.person.id === action.payload.personId) {
            person.status = action.payload.status;
          }
          return person;
        }),
      };
    case "DELETE_APPLICANT_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "RESTORE_APPLICANT_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "RESTORE_APPLICANT_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        people: state.people.map((person) => {
          if (person.person.id === action.payload.personId) {
            person.status = action.payload.status;
          }
          return person;
        }),
      };
    case "RESTORE_APPLICANT_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "UPDATE_APPLICANT_STATUS_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "UPDATE_APPLICANT_STATUS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        person: { ...state.person, status: action.payload.status },
      };
    case "UPDATE_APPLICANT_STATUS_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "GET_ME_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "GET_ME_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        me: action.payload,
      };
    case "GET_ME_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "EDIT_PROFILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "EDIT_PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        me: action.payload,
      };
    case "EDIT_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "UPLOAD_APPLICANT_IMAGE_FAILURE":
      return {
        ...state,
        loadingImage: false,
        error: true,
      };
    case "UPLOAD_APPLICANT_IMAGE_SUCCESS":
      return {
        ...state,
        loadingImage: false,
        error: false,
        person: {
          ...state.person,
          person: { ...state.person.person, imageUrl: action.payload },
        },
      };
    case "UPLOAD_APPLICANT_IMAGE_REQUEST":
      return {
        ...state,
        loadingImage: true,
        error: false,
      };
    case "CHANGE_PASSWORD_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "CHANGE_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
      };
    case "CHANGE_PASSWORD_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    default:
      return { ...state };
  }
};
