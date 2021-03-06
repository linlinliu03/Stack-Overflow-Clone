import * as AnswerApiUtil from "../util/answer_api_util";

export const RECEIVE_ALL_ANSWERS = "RECEIVE_ALL_ANSWERS";
export const RECEIVE_ANSWER = "RECEIVE_ANSWER";
export const REMOVE_ANSWER = "REMOVE_ANSWER";
export const RECEIVE_ANSWER_ERRORS = "RECEIVE_ANSWER_ERRORS";

export const receiveAnswerErrors = errors => ({
    type: RECEIVE_ANSWER_ERRORS,
    errors
})

export const receiveAllAnswers = answers => ({
    type: RECEIVE_ALL_ANSWERS,
    answers
})

export const receiveAnswer = answer => ({
    type: RECEIVE_ANSWER,
    answer
})

export const removeAnswer = answerId => ({
    type: REMOVE_ANSWER,
    answerId
})

export const fetchAnswers = (questionId) => dispatch => (
    AnswerApiUtil.fetchAnswers(questionId)
        .then(answers => dispatch(receiveAllAnswers(answers)))
)

export const createAnswer = answer => dispatch => (
    AnswerApiUtil.createAnswer(answer)
        .then(answer => dispatch(receiveAnswer(answer)),
            err => (
                dispatch(receiveAnswerErrors(err.responseJSON))
            ))
);

export const updateAnswer = answer => dispatch => (
    AnswerApiUtil.updateAnswer(answer)
        .then(answer => dispatch(receiveAnswer(answer)),
            err => (
                dispatch(receiveAnswerErrors(err.responseJSON))
            ))
);

export const deleteAnswer = answerId => dispatch => (
    AnswerApiUtil.deleteAnswer(answerId)
        .then(() => dispatch(removeAnswer(answerId)))
)