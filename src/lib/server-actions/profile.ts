'use server';
import { authClient } from '../auth-client';

const enableTwoFactor = async (password: string) => {
  const data = await authClient.twoFactor.enable({
    password, // the user password is required
  }); // this will enable two factor
  return data;
};

const disableTwoFactor = async (password: string) => {
  const data = await authClient.twoFactor.disable({
    password, // the user password is required
  }); // this will disable two factor
  return data;
};

const signInWith2Factor = async (email: string, password: string) => {
  const data = await authClient.signIn.email({
    email, // replace with actual user email
    password, // replace with actual password
    callbackURL: '/two-factor',
  });
  //if the user has two factor enabled, it will redirect to the two factor page
  return data;
};

const verifyTOTP = async (code: string, trustDevice: boolean = false) => {
  const data = await authClient.twoFactor.verifyOtp({
    code, // the code entered by the user
    /**
     * If the device is trusted, the user won't
     * need to pass 2FA again on the same device
     */
    trustDevice: trustDevice || false,
  });
  return data;
};

export { enableTwoFactor, disableTwoFactor, signInWith2Factor, verifyTOTP };
