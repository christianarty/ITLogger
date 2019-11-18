import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import LogItem from "./LogItem";
import Preloader from "../layout/Preloader";
import PropTypes from "prop-types";
import { getLogs } from "../../actions/logActions";

const Logs = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
    //eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <Fragment>
      <ul className="collection with-header">
        <li className="collection-header">
          <h4 className="center"> System Logs</h4>
        </li>
        {!loading && logs.length === 0 ? (
          <p className="center">No Logs To Show...</p>
        ) : (
          logs.map(log => <LogItem key={log.id} log={log} />)
        )}
      </ul>
    </Fragment>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps, { getLogs })(Logs);
