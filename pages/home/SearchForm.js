import Select from "react-select";

const SearchForm = ({ cities }) => {
  const handleChange = (selectedOption) => {
    window.location.href = "/city/" + selectedOption.value;
  };

  return (
    <form className="form-noborder">
      <div className="form-row">
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <div className="location-dropdown">
            <Select
              className="basic-single"
              classNamePrefix="select"
              options={cities}
              defaultValue={null}
              isSearchable={true}
              name="city"
              placeholder="Keresés városra..."
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
