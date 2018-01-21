import { createAction, handleActions } from 'redux-actions';
import * as api from 'lib/api';
import moment from 'moment';

// 액션 타입
const PREVIOUS = 'apod/PREVIOUS';
const NEXT = 'apod/NEXT';
const HIDE_LOADER = 'apod/HIDE_LOADER';
const GET_APOD_PENDING = 'apod/GET_APOD_PENDING';
const GET_APOD_SUCCESS = 'apod/GET_APOD_SUCCESS';
const GET_APOD_FAILURE = 'apod/GET_APOD_FAILURE';

// 액션 생성 함수
export const previous = createAction(PREVIOUS);
export const next = createAction(NEXT);
export const hideLoader = createAction(HIDE_LOADER);
export const getApod = (date) => dispatch => {
  // 먼저, 요청이 시작했다는것을 알립니다
  dispatch({type: GET_APOD_PENDING});

  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return api.getAPOD(date).then(
    (response) => {
      // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치합니다.
      dispatch({
        type: GET_APOD_SUCCESS,
        payload: response
      })
    }
  ).catch(error => {
    // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
    dispatch({
      type: GET_APOD_FAILURE,
      payload: error
    });
    // error 를 throw 하여, 이 함수가 실행 된 다음에 다시한번 catch 를 할 수 있게 합니다.
    throw(error);
  })
};

// 리듀서의 초깃값
const initialState = {
  maxDate: moment().format('YYYY-MM-DD'),
  date: null,
  url: null,
  title: null,
  mediaType: null,
  loading: false
};

// 리듀서
export default handleActions({
  [PREVIOUS]: (state) => {
    return {
      ...state,
      date: moment(state.date).subtract(1, 'days').format('YYYY-MM-DD')
    };
  },
  [NEXT]: (state) => {
    return {
      ...state,
      date: moment(state.date).add(1, 'days').format('YYYY-MM-DD')
    }
  },
  [HIDE_LOADER]: (state) => {
    return {
      ...state,
      loading: false
    }
  },
  [GET_APOD_PENDING]: (state) => {
    return {
      ...state,
      loading: true
    }
  },
  [GET_APOD_SUCCESS]: (state, action) => {
    const { date: retrievedDate, media_type: mediaType, url, title } = action.payload.data;

    return {
      ...state,
      date: retrievedDate,
      mediaType,
      url,
      title
    }
  },
  [GET_APOD_FAILURE]: (state, action) => {
    return {
      ...state,
      loading: false
    }
  }
}, initialState);