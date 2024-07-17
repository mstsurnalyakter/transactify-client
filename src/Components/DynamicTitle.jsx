import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

const DynamicTitle = ({ pageTitle }) => {
  return (
    <>
      <Helmet>
        <title>Transactify | {pageTitle}</title>
      </Helmet>
    </>
  );
};

DynamicTitle.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default DynamicTitle;
