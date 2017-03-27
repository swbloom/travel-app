import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard.js';

const mapStateToProps = (state) => {
	return {

	};
}


const DashboardContainer = connect(mapStateToProps)(Dashboard);

export default DashboardContainer;