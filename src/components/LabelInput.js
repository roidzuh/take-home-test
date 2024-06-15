//   "

export default function LabelInput({ labelName, type, name, value, onChange }) {
  return (
    <>
      <label className="font-bold">{labelName}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="px-6 py-2 border-2 rounded-lg border-gray-500 mb-6 text-center"
      />
    </>
  );
}
