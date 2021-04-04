import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};



export type Query = {
  __typename?: 'Query';
  isCodeValid: IsCodeValid;
  status: HealthStatus;
  getAnswersByText: Array<Answer>;
  getQuestionParticipants: Array<QuestionParticipant>;
  getParticipant: Participant;
};


export type QueryIsCodeValidArgs = {
  code: Scalars['String'];
};


export type QueryGetAnswersByTextArgs = {
  question: Scalars['String'];
};


export type QueryGetQuestionParticipantsArgs = {
  question: Scalars['String'];
};

export type HealthStatus = {
  __typename?: 'HealthStatus';
  name: Scalars['String'];
  status: Scalars['String'];
  version: Scalars['String'];
};

export type Answer = {
  __typename?: 'Answer';
  text: Scalars['String'];
  isValidated: Scalars['Boolean'];
  participantName: Scalars['String'];
};

export type QuestionParticipant = {
  __typename?: 'QuestionParticipant';
  participantName: Scalars['String'];
};

export type Participant = {
  __typename?: 'Participant';
  name: Scalars['String'];
  id: Scalars['ID'];
  roomName: Scalars['String'];
  roomId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRoom: CreatedRoom;
  joinRoom: RoomJoined;
  submitAnswer: AnswerSubmitted;
};


export type MutationCreateRoomArgs = {
  name: Scalars['String'];
};


export type MutationJoinRoomArgs = {
  code: Scalars['String'];
  name: Scalars['String'];
};


export type MutationSubmitAnswerArgs = {
  params: SubmitAnswerInput;
};

export type CreatedRoom = {
  __typename?: 'CreatedRoom';
  code: Scalars['String'];
};

export type IsCodeValid = {
  __typename?: 'IsCodeValid';
  isValid: Scalars['Boolean'];
};

export type AnswerSubmitted = {
  __typename?: 'AnswerSubmitted';
  message: Scalars['String'];
};

export type SubmitAnswerInput = {
  question: Scalars['String'];
  answer: Scalars['String'];
  isValidated?: Maybe<Scalars['Boolean']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newQuestionParticipant: NewQuestionParticipantPayload;
  newQuestionAnswer: NewAnswerPayload;
};

export type NewQuestionParticipantPayload = {
  __typename?: 'NewQuestionParticipantPayload';
  name: Scalars['String'];
  action: QuestionParticipantChangeAction;
};

export enum QuestionParticipantChangeAction {
  Join = 'JOIN',
  Leave = 'LEAVE'
}

export type NewAnswerPayload = {
  __typename?: 'NewAnswerPayload';
  text: Scalars['String'];
  isValidated: Scalars['Boolean'];
  participantName: Scalars['String'];
};

export type RoomJoined = {
  __typename?: 'RoomJoined';
  jwtToken: Scalars['String'];
};

export type GetParticipantQueryVariables = Exact<{ [key: string]: never; }>;


export type GetParticipantQuery = (
  { __typename?: 'Query' }
  & { getParticipant: (
    { __typename?: 'Participant' }
    & Pick<Participant, 'name' | 'id' | 'roomName' | 'roomId'>
  ) }
);

export type GetAnswersQueryVariables = Exact<{
  questionText: Scalars['String'];
}>;


export type GetAnswersQuery = (
  { __typename?: 'Query' }
  & { getAnswersByText: Array<(
    { __typename?: 'Answer' }
    & Pick<Answer, 'text' | 'isValidated' | 'participantName'>
  )> }
);

export type GetParticipantsQueryVariables = Exact<{
  question: Scalars['String'];
}>;


export type GetParticipantsQuery = (
  { __typename?: 'Query' }
  & { getQuestionParticipants: Array<(
    { __typename?: 'QuestionParticipant' }
    & Pick<QuestionParticipant, 'participantName'>
  )> }
);

export type CreateRoomMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateRoomMutation = (
  { __typename?: 'Mutation' }
  & { createRoom: (
    { __typename?: 'CreatedRoom' }
    & Pick<CreatedRoom, 'code'>
  ) }
);

export type JoinRoomMutationVariables = Exact<{
  code: Scalars['String'];
  name: Scalars['String'];
}>;


export type JoinRoomMutation = (
  { __typename?: 'Mutation' }
  & { joinRoom: (
    { __typename?: 'RoomJoined' }
    & Pick<RoomJoined, 'jwtToken'>
  ) }
);

export const GetParticipantDocument = gql`
    query getParticipant {
  getParticipant {
    name
    id
    roomName
    roomId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetParticipantGQL extends Apollo.Query<GetParticipantQuery, GetParticipantQueryVariables> {
    document = GetParticipantDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAnswersDocument = gql`
    query getAnswers($questionText: String!) {
  getAnswersByText(question: $questionText) {
    text
    isValidated
    participantName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAnswersGQL extends Apollo.Query<GetAnswersQuery, GetAnswersQueryVariables> {
    document = GetAnswersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetParticipantsDocument = gql`
    query getParticipants($question: String!) {
  getQuestionParticipants(question: $question) {
    participantName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetParticipantsGQL extends Apollo.Query<GetParticipantsQuery, GetParticipantsQueryVariables> {
    document = GetParticipantsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateRoomDocument = gql`
    mutation createRoom($name: String!) {
  createRoom(name: $name) {
    code
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateRoomGQL extends Apollo.Mutation<CreateRoomMutation, CreateRoomMutationVariables> {
    document = CreateRoomDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const JoinRoomDocument = gql`
    mutation joinRoom($code: String!, $name: String!) {
  joinRoom(code: $code, name: $name) {
    jwtToken
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class JoinRoomGQL extends Apollo.Mutation<JoinRoomMutation, JoinRoomMutationVariables> {
    document = JoinRoomDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }