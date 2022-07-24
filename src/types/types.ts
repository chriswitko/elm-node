export interface ResponseRecognisePath {
  languageISO: string;
  jsonData: string;
}

export interface ConfigurationRequest {
  lang: string;
}

export interface Stroke {
  id: string;
  x: number[];
  y: number[];
}

export interface StrokeGroup {
  strokes: Stroke[];
}

export interface RequestBody {
  configuration: ConfigurationRequest;
  contentType: string;
  strokeGroups: StrokeGroup[];
}

export interface computeHmac {
  (input: string, applicationKey: string, hmacKey: string): string;
}
