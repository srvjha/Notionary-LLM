 interface APIResponse {
  sourceCode:number;
  success:boolean;
  message: string;
  data:{
    [key: string]: any;
  }
}

interface ChatUploadType{
  userQuery: string;
}

export type {
  APIResponse,
  ChatUploadType
}

