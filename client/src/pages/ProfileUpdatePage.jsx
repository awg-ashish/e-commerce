import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useUpdateMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const ProfileUpdatePage = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [update] = useUpdateMutation();

  //initialize the local states for userName and password
  const [showUserNameEdit, setShowUserNameEdit] = useState(false);
  const [showPasswordEdit, setShowPasswordEdit] = useState(false);
  const [userName, setUserName] = useState(userInfo?.name);
  const [password, setPassword] = useState("");

  //initialize the local states for the address form
  const [showAddAddressPopup, setShowAddAddressPopup] = useState(false);
  const [showEditAddressPopup, setShowEditAddressPopup] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [disableDefaultAddress, setDisableDefaultAddress] = useState(false);

  //dispatch hook for updating the redux state
  const dispatch = useDispatch();

  //function to update name
  const updateUserNameHandler = async () => {
    try {
      let updatedUserName = userName;
      const res = await toast
        .promise(
          update({
            name: updatedUserName,
          }),
          {
            pending: "Loading...",
            success: "Updated Successfully.",
            error: "There was an error.",
          }
        )
        .unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      console.log(err);
      toast.error(err?.data.message);
    }
    setShowUserNameEdit((prev) => !prev);
  };

  //function to update name
  const updatePasswordHandler = async () => {
    try {
      let updatedPassword = password;
      const res = await toast
        .promise(
          update({
            password: updatedPassword,
          }),
          {
            pending: "Loading...",
            success: "Updated Successfully.",
            error: "There was an error.",
          }
        )
        .unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      console.log(err);
      toast.error(err?.data.message);
    }
    setShowPasswordEdit((prev) => !prev);
  };

  //function to add new address
  const addAddressHandler = async () => {
    try {
      let updatedUserAddress = [...userInfo.address];
      //if the user has selected this address to be default address we need to set the selected value of all other addresses to be false
      if (defaultAddress) {
        updatedUserAddress = userInfo.address.map((item) => ({
          ...item,
          selected: false,
        }));
      }

      const res = await toast
        .promise(
          update({
            address: [
              ...updatedUserAddress,
              {
                name,
                contact,
                street,
                city,
                state,
                country,
                pinCode,
                selected: defaultAddress,
              },
            ],
          }),
          {
            pending: "Loading...",
            success: "Added successfully.",
            error: "There was an error.",
          }
        )
        .unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      console.log(err);
      toast.error(err?.data.message);
    }
    setName("");
    setContact("");
    setStreet("");
    setCity("");
    setState("");
    setCountry("");
    setPinCode("");
    setDefaultAddress(false);
    setShowAddAddressPopup((prev) => !prev);
  };
  //function to show edit address popup
  const showEditAddressHandler = (item) => {
    setShowEditAddressPopup((prev) => !prev);
    setAddressId(item._id);
    setName(item.name);
    setContact(item.contact);
    setStreet(item.street);
    setCity(item.city);
    setState(item.state);
    setCountry(item.country);
    setPinCode(item.pinCode);
    setDefaultAddress(item.selected);
    setDisableDefaultAddress(item.selected);
  };
  //function to show add address popup
  const showAddAddressHandler = () => {
    setShowAddAddressPopup((prev) => !prev);
    setName("");
    setContact("");
    setStreet("");
    setCity("");
    setState("");
    setCountry("");
    setPinCode("");
    //if this is the first address being added then we need to make it default
    userInfo.address.length
      ? setDefaultAddress(false)
      : setDefaultAddress(true);
  };

  //function to edit address
  const editAddressHandler = async () => {
    let selectedAddress = userInfo.address.find((item) => {
      return item._id === addressId;
    });
    let selectedAddressIndex = userInfo.address.findIndex((item) => {
      return item._id === addressId;
    });
    selectedAddress = {
      ...selectedAddress,
      name,
      contact,
      street,
      city,
      state,
      country,
      pinCode,
      selected: defaultAddress,
    };

    let address;
    //if the user has made this address as default address, we need to set selected to false for other addresses.
    if (defaultAddress) {
      address = userInfo.address.map((item) => ({
        ...item,
        selected: false,
      }));
    } else {
      address = [...userInfo.address];
    }

    address[selectedAddressIndex] = selectedAddress;

    try {
      const res = await toast
        .promise(
          update({
            address: [...address],
          }),
          {
            pending: "Loading...",
            success: "Changes Saved.",
            error: "An error has occurred.",
          }
        )
        .unwrap();
      dispatch(
        setCredentials({
          ...res,
        })
      );
    } catch (err) {
      console.log(err);
    }
    setName("");
    setContact("");
    setStreet("");
    setCity("");
    setState("");
    setCountry("");
    setPinCode("");
    setDefaultAddress(false);
    setShowEditAddressPopup((prev) => !prev);
  };

  //function to delete address
  const addressDeleteHandler = async (id) => {
    const [defaultAddress] = userInfo.address.filter(
      (item) => item.selected === true
    );
    const [toDeleteAddress] = userInfo.address.filter(
      (item) => item._id === id
    );
    //check if the address being deleted is default address or not
    if (toDeleteAddress._id === defaultAddress._id) {
      toast.error("Cannot delete default address.");
      return;
    }
    const address = userInfo.address.filter((item) => item._id != id);
    try {
      const res = await toast
        .promise(
          update({
            address: [...address],
          }),
          {
            pending: "Loading...",
            success: "Deleted.",
            error: "Error deleting...",
          }
        )
        .unwrap();
      dispatch(
        setCredentials({
          ...res,
        })
      );
    } catch (err) {
      toast.error(err?.data?.message || err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-medium mb-4 mt-10 mx-2">Your Profile</h1>
      <div className="border rounded-lg p-6">
        <div className="flex items-center justify-center">
          <div className="basis-4/5">
            <h2 className="font-bold">Name</h2>
            {!showUserNameEdit && <p>{userName}</p>}
            {showUserNameEdit && (
              <input
                type="text"
                className="border w-full rounded my-1 p-1"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            )}
          </div>
          <button
            onClick={
              showUserNameEdit
                ? updateUserNameHandler
                : () => setShowUserNameEdit((prev) => !prev)
            }
            className="border border-gray-300 w-full py-0.5 rounded shadow-sm hover:shadow-lg transition duration-100 hover:bg-gray-100 my-1 mx-6 basis-1/5"
          >
            {showUserNameEdit ? "Done" : "Edit"}
          </button>
        </div>
        <hr className="my-6" />
        <div className="flex items-center justify-center">
          <div className="basis-4/5">
            <h2 className="font-bold">Email</h2>
            <p>{userInfo.email}</p>
          </div>
          <button
            disabled
            className="border border-gray-300 w-full py-0.5 rounded shadow-sm  transition duration-100 my-1 mx-6 basis-1/5 disabled:bg-gray-100 disabled:text-gray-400"
          >
            Edit
          </button>
        </div>
        <hr className="my-6" />
        <div className="flex items-center justify-center">
          <div className="basis-4/5">
            <h2 className="font-bold">Password</h2>
            {!showPasswordEdit && <p>********</p>}
            {showPasswordEdit && (
              <input
                type="password"
                className="border w-full rounded my-1 p-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
          </div>
          <button
            disabled={showPasswordEdit && password.length < 6}
            onClick={
              showPasswordEdit && password.length > 6
                ? updatePasswordHandler
                : () => setShowPasswordEdit((prev) => !prev)
            }
            className="border border-gray-300 w-full py-0.5 rounded shadow-sm enabled:hover:shadow-lg transition duration-100 hover:bg-gray-100 my-1 mx-6 basis-1/5 disabled:bg-gray-100 disabled:text-gray-400"
          >
            {showPasswordEdit ? "Done" : "Edit"}
          </button>
        </div>
        <hr className="my-6" />
        <div>
          <h2 className="font-bold">Address Book</h2>
          {userInfo.address.map((item) => {
            return (
              <div className={`border-b my-0.5 p-2`} key={item._id}>
                <p>
                  <span className="font-semibold">{item.name}</span>
                  {`, ${item.street}, ${item.city}, ${item.state}, ${item.country} - ${item.pinCode}. Contact: ${item.contact}`}
                  {item.selected ? (
                    <span className="border p-1 mx-2 text-[12px] rounded bg-gray-100 text-gray-500">
                      Default Address
                    </span>
                  ) : (
                    ""
                  )}
                  <br />
                  <span
                    className="text-sm text-blue-800 hover:cursor-pointer hover:underline hover:text-red-800"
                    onClick={() => showEditAddressHandler(item)}
                  >
                    Edit Address
                  </span>
                  <span className="text-sm text-blue-800 mx-2">|</span>
                  <span
                    className="text-sm text-blue-800 hover:cursor-pointer hover:underline hover:text-red-800"
                    onClick={() => addressDeleteHandler(item._id)}
                  >
                    Delete Address
                  </span>
                </p>

                {showEditAddressPopup && (
                  <div className="w-full bg-gray-900/50 absolute top-0 left-0 z-50">
                    <div className="bg-white w-1/2 shadow border opacity-100 mx-auto my-8 p-8">
                      <div className="flex justify-between">
                        <h2 className="text-2xl font-bold">Edit address</h2>
                        <span
                          onClick={() =>
                            setShowEditAddressPopup((prev) => !prev)
                          }
                          className="p-1 hover:border-gray-300 rounded hover:cursor-pointer border border-white hover:shadow"
                        >
                          <ClearIcon />
                        </span>
                      </div>

                      <hr className="mb-6" />
                      <p className="font-medium text-sm">Country/Region</p>
                      <input
                        type="text"
                        className="border w-full rounded my-1 p-1"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                      <p className="font-medium text-sm mt-2">
                        Enter full name
                      </p>
                      <input
                        type="text"
                        className="border w-full rounded my-1 p-1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <p className="font-medium text-sm mt-2">Mobile Number</p>
                      <input
                        type="text"
                        className="border w-full rounded my-1 p-1"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                      <p className="font-medium text-sm mt-2">Pin Code</p>
                      <input
                        type="text"
                        className="border w-full rounded my-1 p-1"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                      />
                      <p className="font-medium text-sm mt-2">
                        Area, Street, Sector, Village
                      </p>
                      <input
                        type="text"
                        className="border w-full rounded my-1 p-1"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                      <p className="font-medium text-sm mt-2">Town/City</p>
                      <input
                        type="text"
                        className="border w-full rounded my-1 p-1"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <p className="font-medium text-sm mt-2">State</p>
                      <input
                        type="text"
                        className="border w-full rounded my-1 p-1 mb-2"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                      <input
                        type="checkbox"
                        name="defaultAddress"
                        id=""
                        checked={defaultAddress}
                        disabled={disableDefaultAddress}
                        onChange={() => setDefaultAddress((prev) => !prev)}
                      />
                      <label htmlFor="defaultAddress" className="pl-2">
                        {disableDefaultAddress
                          ? "This is my default address"
                          : "Make this my default address"}
                      </label>
                      <button
                        className="mt-2 bg-amz-yellow hover:bg-amz-yellow-dark py-1 my-1 w-full rounded-md enabled:shadow-lg enabled:hover:shadow-xl transition duration-100 disabled:bg-gray-400"
                        onClick={editAddressHandler}
                      >
                        Save Address
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <p
            className="text-sm text-blue-800 hover:cursor-pointer hover:underline hover:text-red-800 inline p-4"
            onClick={showAddAddressHandler}
          >
            <span className="text-gray-300">
              <AddIcon />
            </span>
            Add a new address
          </p>
          {showAddAddressPopup && (
            <div className="w-full bg-gray-900/75 absolute top-0 left-0 z-50">
              <div className="bg-white w-1/2 shadow border opacity-100 mx-auto my-8 p-8">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold">Add a new address</h2>
                  <span
                    onClick={() => setShowAddAddressPopup((prev) => !prev)}
                    className="p-1 hover:border-gray-300 rounded hover:cursor-pointer border border-white hover:shadow"
                  >
                    <ClearIcon />
                  </span>
                </div>

                <hr className="mb-6" />
                <p className="font-medium text-sm">Country/Region</p>
                <input
                  type="text"
                  className="border w-full rounded my-1 p-1"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <p className="font-medium text-sm mt-2">Enter full name</p>
                <input
                  type="text"
                  className="border w-full rounded my-1 p-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <p className="font-medium text-sm mt-2">Mobile Number</p>
                <input
                  type="text"
                  className="border w-full rounded my-1 p-1"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <p className="font-medium text-sm mt-2">Pin Code</p>
                <input
                  type="text"
                  className="border w-full rounded my-1 p-1"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
                <p className="font-medium text-sm mt-2">
                  Area, Street, Sector, Village
                </p>
                <input
                  type="text"
                  className="border w-full rounded my-1 p-1"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                <p className="font-medium text-sm mt-2">Town/City</p>
                <input
                  type="text"
                  className="border w-full rounded my-1 p-1"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <p className="font-medium text-sm mt-2">State</p>
                <input
                  type="text"
                  className="border w-full rounded my-1 p-1 mb-2"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <input
                  type="checkbox"
                  name="defaultAddress"
                  checked={defaultAddress}
                  disabled={!userInfo.address.length}
                  onChange={() => setDefaultAddress((prev) => !prev)}
                />
                <label htmlFor="defaultAddress" className="pl-2">
                  Make this my default address
                </label>
                <button
                  className="mt-2 bg-amz-yellow hover:bg-amz-yellow-dark py-1 my-1 w-full rounded-md enabled:shadow-lg enabled:hover:shadow-xl transition duration-100 disabled:bg-gray-400"
                  onClick={addAddressHandler}
                >
                  Add Address
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
