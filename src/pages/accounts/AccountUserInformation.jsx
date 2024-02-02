const AccountUserInformation = () => {
  return (
    <div className="space-y-4">
      <UserDetailComponent title={"First Name"} type={"text"} />
      <UserDetailComponent title={"Last Name"} type={"text"} />
      <UserDetailComponent title={"Email Address"} type={"text"} />
      <UserDetailComponent
        title={"New Password"}
        placeholder={"New Password"}
        type={"text"}
      />
      <UserDetailComponent
        title={"Confirm Password"}
        placeholder={"Confirm Password"}
        type={"text"}
      />
      <div className="flex items-center">
        <div className="w-[20%]">Allow me to view adult related content</div>
        <div className="">
          <input
            type="checkbox"
            className="w-full py-2 bg-slate-200 px-4 flex justify-start"
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[20%]">Deactivate Account</div>
      </div>
      <div className="flex justify-end pr-60">
        <div className="flex bg-blue-400 text-white font-medium justify-center py-2 px-6">
          Save
        </div>
      </div>
    </div>
  );
};

export default AccountUserInformation;

export const UserDetailComponent = ({
  title,
  placeholder,
  onChange,
  value,
  type,
}) => {
  return (
    <div className="flex items-center">
      <div className="w-[20%]">{title}</div>
      <div className="w-[80%] pr-60">
        <input
          type={type}
          className="w-full py-2 bg-slate-200 px-4"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};
