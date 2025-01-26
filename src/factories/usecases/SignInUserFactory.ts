import signInUser from '@/src/domain/usecases/SignInUser';
import makeAuthService from '../services/AuthServiceFactory';

const makeSignInUser = () => {
  return new signInUser(makeAuthService());
};

export default makeSignInUser;
