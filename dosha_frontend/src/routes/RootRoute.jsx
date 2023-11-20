import { Routes, Route, Navigate } from 'react-router-dom';
import Educations from '../pages/education/educations';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Home from '../pages/Home';
import ManagerAppointments from '../pages/appointment/ManagerAppointments';
import SubmanagerAppointments from '../pages/appointment/SubmanagerAppointments';
import NoUrl from '../components/NoUrl';
import SubmanagerList from '../pages/submanagerlist/SubmanagerList';
import CommitteeList from '../pages/committee/CommitteeList';
import Company from '../pages/company/Company';
import Inspection from '../pages/inspection/Inspection';
import CompanyEdit from '../pages/company/CompanyEdit';
import ProceedingsList from '../pages/proceedings/ProceedingsList';
import InspectionList from '../pages/inspection/InspectionList';
import InspectionCheck from '../pages/inspection/InspectionCheck';
import ProceedingsEdit from '../pages/proceedings/ProceedingsEdit';
import ProceedingsRegist from '../pages/proceedings/ProceedingsRegist';
import RiskRegist from '../pages/risk/RiskRegist';
import MeetingList from '../pages/meeting/MeetingList';
import MeetingRegist from '../pages/meeting/MeetingRegist';
import MeetingView from '../pages/meeting/MeetingView';
import RiskList from '../pages/risk/RiskList';
import RiskView from '../pages/risk/RiskView';

function RootRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/manager/appointments" element={<ManagerAppointments />} />
        <Route path="/manager/educations" element={<Educations />} />
        <Route
          path="/submanager/appointments"
          element={<SubmanagerAppointments />}
        />
        <Route path="/submanager/list" element={<SubmanagerList />} />
        <Route path="/committee" element={<CommitteeList />} />
        <Route path="/company" element={<Company />} />
        <Route path="/company/edit" element={<CompanyEdit />} />
        <Route path="/inspection" element={<Inspection />} />
        <Route path="/inspectionlist" element={<InspectionList />} />
        <Route path="/inspection/check" element={<InspectionCheck />} />
        <Route path="/proceedings" element={<ProceedingsList />} />
        <Route path="/proceedings/regist" element={<ProceedingsRegist />} />
        <Route path="/proceedings/edit" element={<ProceedingsEdit />} />
        <Route path="/risk/regist" element={<RiskRegist />} />
        <Route path="/meeting/list" element={<MeetingList />} />
        <Route path="/meeting/regist" element={<MeetingRegist />} />
        <Route path="/meeting/view" element={<MeetingView />} />
        <Route path="/risk/list" element={<RiskList />} />
        <Route path="/risk/check" element={<RiskView />} />
      </Route>
      <Route path="/*" element={<NoUrl />} />
    </Routes>
  );
}

export default RootRoutes;
