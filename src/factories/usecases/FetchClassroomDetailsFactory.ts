import FetchClassroomDetails from '@/src/domain/usecases/FetchClassroomDetails';
import makeClassroomDetails from '../services/ClassroomDetailsFactory';

const makeFetchClassroomDetails = () => {
  return new FetchClassroomDetails(makeClassroomDetails());
};

export default makeFetchClassroomDetails;
