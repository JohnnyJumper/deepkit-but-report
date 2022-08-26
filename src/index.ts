#!/usr/bin/env npx ts-node-script
import { App } from "@deepkit/app";
import { FrameworkModule } from "@deepkit/framework";
import { http } from '@deepkit/http';
import { Type, Validate, ValidatorError } from "@deepkit/type";


const regex = new RegExp(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/g);

export const EmailValidator = (value: string, type: Type) => {
  value = value.trim();
  if (!regex.test(value)) {
    return new ValidatorError(
      "Incorrect email format",
      `Value provided is considered as incorrect email: ${value}`
    );
  }
};

@http.controller('/')
class SomeController {

  @http.GET('/test/:email')
  getEmailVerification(email: string & Validate<typeof EmailValidator>) {
    return email;
  }

}

const app = new App({
  controllers: [SomeController],
  imports: [new FrameworkModule(
    {
      port: 7575,
      debug: true
    }
  )],
}).run();