
import  { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import useAssetStore from '../../../store/useAssetStore';

const overlayAnimation = {
  layout: true,
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 },
};

export default function AssignAssetModal({
  isOpen,
  onClose,
  employeeId,
  employeeName = '',
}) {
  const { assetGroups, getAssetGroups, assignAsset } = useAssetStore();

  // form fields
  const [assetNo, setAssetNo] = useState('');
  const [assetGroup, setAssetGroup] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [valueInRupee, setValueInRupee] = useState('');
  const [status, setStatus] = useState('');
  const [assignDate, setAssignDate] = useState(new Date());
  const [invoice, setInvoice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [warranty, setWarranty] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // fetch asset groups
      getAssetGroups();

      // prevent body scroll
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen, getAssetGroups]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Build data
    const dataToSubmit = {
      assetNo,
      assetGroup,
      brand,
      model,
      valueInRupee,
      status,
      assignDate: assignDate?.toISOString().split('T')[0] || '',
      invoice,
      description,
      image,
      warranty,
    };

    await assignAsset(employeeId, dataToSubmit, () => {
      // onSuccess callback
      onClose();
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          {...overlayAnimation}
        >
          <motion.div
            layout
            className="bg-white dark:bg-gray-800 rounded-md p-6 w-full max-w-4xl shadow-lg"
            {...overlayAnimation}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Assign Asset to ({employeeName || 'Employee'})
              </h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Asset No */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Asset Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 dark:border-gray-600
                               rounded px-3 py-2 focus:outline-none
                               bg-white dark:bg-gray-700 dark:text-white"
                    required
                    value={assetNo}
                    onChange={(e) => setAssetNo(e.target.value)}
                  />
                </div>

                {/* Asset Group */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Asset Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border border-gray-300 dark:border-gray-600
                               rounded px-3 py-2 focus:outline-none
                               bg-white dark:bg-gray-700 dark:text-white"
                    required
                    value={assetGroup}
                    onChange={(e) => setAssetGroup(e.target.value)}
                  >
                    <option value="">Select</option>
                    {assetGroups.map((group) => (
                      <option key={group._id} value={group.name}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full border border-gray-300 dark:border-gray-600
                               rounded px-3 py-2 focus:outline-none
                               bg-white dark:bg-gray-700 dark:text-white"
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Brand */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 dark:border-gray-600
                               rounded px-3 py-2 focus:outline-none
                               bg-white dark:bg-gray-700 dark:text-white"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>

                {/* Model */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 dark:border-gray-600
                               rounded px-3 py-2 focus:outline-none
                               bg-white dark:bg-gray-700 dark:text-white"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                </div>

                {/* Invoice */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Invoice Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 dark:border-gray-600
                               rounded px-3 py-2 focus:outline-none
                               bg-white dark:bg-gray-700 dark:text-white"
                    value={invoice}
                    onChange={(e) => setInvoice(e.target.value)}
                  />
                </div>

                {/* Value in Rupee */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Value (in Rupees) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    className="w-full border border-gray-300 dark:border-gray-600
                               rounded px-3 py-2 focus:outline-none
                               bg-white dark:bg-gray-700 dark:text-white"
                    value={valueInRupee}
                    onChange={(e) => setValueInRupee(e.target.value)}
                  />
                </div>

                {/* Warranty */}
                <div className="flex items-center space-x-2 mt-6">
                  <input
                    type="checkbox"
                    id="warranty"
                    checked={warranty}
                    onChange={(e) => setWarranty(e.target.checked)}
                  />
                  <label htmlFor="warranty" className="text-sm font-medium">
                    Under Warranty?
                  </label>
                </div>

                {/* Image */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Image <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <label
                      className="flex flex-col items-center px-3 py-2 bg-blue-50 text-blue-600
                                 border border-blue-300 rounded cursor-pointer hover:bg-blue-100
                                 transition-colors text-sm"
                    >
                      <span>Click to upload</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        required
                        onChange={handleFileChange}
                      />
                    </label>
                    <span className="text-sm">
                      {image ? image.name : 'No file chosen'}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full border border-gray-300 dark:border-gray-600
                               rounded px-3 py-2 focus:outline-none
                               bg-white dark:bg-gray-700 dark:text-white"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Returned">Returned</option>
                  </select>
                </div>

                {/* Assign Date */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium">
                    Assign Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={assignDate}
                      onChange={(date) => setAssignDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD/MM/YYYY"
                      className="w-full border border-gray-300 dark:border-gray-600
                                 rounded px-3 py-2 focus:outline-none
                                 bg-white dark:bg-gray-700 dark:text-white pl-10"
                    />
                    <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded border border-orange-400
                             text-orange-500 hover:bg-orange-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white
                             hover:bg-blue-700 transition-colors"
                >
                  Assign Asset
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

