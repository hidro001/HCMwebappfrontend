
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineEye } from 'react-icons/ai'; // Eye icon

import useVacancyStore from '../../store/useVacancyStore'; // <-- Our Zustand store

const AllVacancies = () => {
  const {
    vacancies: storeVacancies,
    loading,
    error,
    fetchAllVacancies,
  } = useVacancyStore();

  const [vacanciesData, setVacanciesData] = useState([]);

  useEffect(() => {
    // 1) Fetch from the backend on mount
    fetchAllVacancies();
  }, [fetchAllVacancies]);

  useEffect(() => {
    // 2) Transform store data into UI-friendly shape
    if (!loading && storeVacancies?.length) {
      const transformed = storeVacancies.map((job) => {
        return {
          id: job._id,
          title: job.jobTitle || 'Untitled',
          location:
            job.jobLocations && job.jobLocations.length
              ? job.jobLocations[0]
              : 'Remote',
          department: job.jobDepartment || 'Development',
          salary: job.salary || 0,
          status: mapStatus(job.vacancyStatus),
          publication: new Date(job.createdAt).toDateString(),
          positionType: job.jobTitle || 'UX/UI Designer',
          workExperience: job.workExperience || 'Any Experience',
          description: job.jobDescription || 'No description provided',
        };
      });
      setVacanciesData(transformed);
    } else if (!loading && storeVacancies?.length === 0) {
      setVacanciesData([]);
    }
  }, [storeVacancies, loading]);

  function mapStatus(backendStatus = '') {
    const s = backendStatus.toLowerCase();
    if (s === 'open') return 'OPEN';
    if (s === 'closed') return 'COMPLETED';
    if (s === 'in progress') return 'IN PROGRESS';
    return 'OPEN'; // fallback
  }

  // Tabs, Filters, Modals...
  const [selectedTab, setSelectedTab] = useState('ALL');
  const [filters, setFilters] = useState({
    department: 'All Department',
    positionType: 'All Positions',
    workExperience: 'Any Experience',
    location: 'Any Location',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleFilterClick = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    toast.success(`Filter updated: ${type} -> ${value}`);
  };

  const handleClearAll = () => {
    setFilters({
      department: 'All Department',
      positionType: 'All Positions',
      workExperience: 'Any Experience',
      location: 'Any Location',
    });
    toast.success('All filters cleared!');
  };

  const handleOpenReferModal = (vacancy) => {
    setSelectedVacancy(vacancy);
    setIsReferModalOpen(true);
  };

  const handleCloseReferModal = () => {
    setSelectedVacancy(null);
    setIsReferModalOpen(false);
  };

  const handleOpenDetailsModal = (vacancy) => {
    setSelectedVacancy(vacancy);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedVacancy(null);
    setIsDetailsModalOpen(false);
  };

  // ----------------------------
  // Filter logic
  // ----------------------------
  const filteredVacancies = vacanciesData.filter((vac) => {
    if (selectedTab === 'OPEN' && vac.status !== 'OPEN') return false;
    if (selectedTab === 'COMPLETED' && vac.status !== 'COMPLETED') return false;
    if (selectedTab === 'IN PROGRESS' && vac.status !== 'IN PROGRESS') return false;

    if (filters.department !== 'All Department' && vac.department !== filters.department) {
      return false;
    }
    if (filters.positionType !== 'All Positions' && vac.positionType !== filters.positionType) {
      return false;
    }
    if (filters.workExperience !== 'Any Experience' && vac.workExperience !== filters.workExperience) {
      return false;
    }
    if (
      filters.location !== 'Any Location' &&
      !vac.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div className="mx-auto px-4 py-4 max-w-full">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b dark:border-gray-700 gap-2">
          <h1 className="text-xl sm:text-2xl font-semibold">Vacancies</h1>
          <div className="flex items-center flex-wrap gap-2">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              Import
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              + Add Vacancy
            </button>
          </div>
        </div>

        {/* Tabs + Mobile Filter Button */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex space-x-2 overflow-x-auto">
            {['ALL', 'OPEN', 'COMPLETED', 'IN PROGRESS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-full border whitespace-nowrap transition
                  ${
                    selectedTab === tab
                      ? 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-200 dark:text-blue-800'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300'
                  }
                `}
              >
                {tab === 'ALL'
                  ? 'All Vacancies'
                  : tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 2xl:hidden"
          >
            Show Filter
          </button>
        </div>

        {/* If there's a fetch error */}
        {error && (
          <div className="bg-red-100 text-red-800 p-3 mt-4 rounded">{error}</div>
        )}

        {/* If still loading */}
        {loading ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            Loading vacancies...
          </div>
        ) : (
          <div className="flex flex-col 2xl:flex-row gap-4 py-4">
            {/* Vacancies Table */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="overflow-x-auto w-full">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300 text-sm">
                      <th className="px-6 py-3 font-semibold">Position Title</th>
                      <th className="px-6 py-3 font-semibold">Location</th>
                      <th className="px-6 py-3 font-semibold">Department</th>
                      <th className="px-6 py-3 font-semibold">Salary</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                      <th className="px-6 py-3 font-semibold">Publication</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVacancies.map((vacancy) => (
                      <tr
                        key={vacancy.id}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {vacancy.title}
                        </td>
                        <td className="px-6 py-4">{vacancy.location}</td>
                        <td className="px-6 py-4">{vacancy.department}</td>
                        <td className="px-6 py-4">${vacancy.salary.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded
                              ${
                                vacancy.status === 'OPEN'
                                  ? 'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800'
                                  : vacancy.status === 'COMPLETED'
                                  ? 'bg-orange-100 text-orange-700 dark:bg-orange-200 dark:text-orange-800'
                                  : 'bg-purple-100 text-purple-700 dark:bg-purple-200 dark:text-purple-800'
                              }
                            `}
                          >
                            {vacancy.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{vacancy.publication}</td>
                        <td className="px-6 py-4 text-right flex items-center justify-end space-x-2">
                          {/* Eye Icon -> View Job Details */}
                          <button
                            onClick={() => handleOpenDetailsModal(vacancy)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
                            title="View Job Details"
                          >
                            <AiOutlineEye size={18} />
                          </button>

                          {/* Refer Button */}
                          <button
                            onClick={() => handleOpenReferModal(vacancy)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                          >
                            Refer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="p-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-2">
                <div>
                  Showing 1 to {filteredVacancies.length} of {vacanciesData.length} entries
                </div>
                <div className="flex space-x-3">
                  <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
                    &lt;
                  </button>
                  <button className="px-2 py-1 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
                    &gt;
                  </button>
                </div>
              </div>
            </div>

            {/* FILTER PANEL (≥2xl) */}
            <div className="hidden 2xl:block 2xl:w-80 border-l dark:border-gray-700 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <FilterPanel
                filters={filters}
                handleFilterClick={handleFilterClick}
                handleClearAll={handleClearAll}
              />
            </div>
          </div>
        )}
      </div>

      {/* MOBILE FILTER DRAWER */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
          isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } 2xl:hidden`}
        onClick={() => setIsFilterOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 dark:border-gray-700 border-l z-50 transform transition-transform duration-300
          ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}
          2xl:hidden
        `}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="font-semibold text-lg">Vacancies Filter</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded"
          >
            Close
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-full">
          <FilterPanel
            filters={filters}
            handleFilterClick={handleFilterClick}
            handleClearAll={handleClearAll}
          />
        </div>
      </div>

      {/* Referral Modal */}
      <ReferralModal
        isOpen={isReferModalOpen}
        onClose={handleCloseReferModal}
        vacancy={selectedVacancy}
      />

      {/* Job Details Modal */}
      <JobDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        vacancy={selectedVacancy}
      />
    </div>
  );
};

export default AllVacancies;

// -------------- FilterPanel ---------------
function FilterPanel({ filters, handleFilterClick, handleClearAll }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Vacancies Filter</h2>
        <button
          onClick={handleClearAll}
          className="text-blue-500 text-sm underline"
        >
          CLEAR ALL
        </button>
      </div>
      {/* Department */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Department</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'All Department',
            'Development',
            'Sales & Marketing',
            'Project Management',
            'Support',
            'Analytics & Data',
          ].map((dept) => (
            <FilterChip
              key={dept}
              label={dept}
              selected={filters.department === dept}
              onClick={() => handleFilterClick('department', dept)}
            />
          ))}
        </div>
      </div>
      {/* Position Type */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Position Type</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'All Positions',
            'UX/UI Designer',
            'PM',
            'React Developer',
            'QA',
            'Data Analyst',
            'Backend Java Developer',
            'DevOps',
            'Python Django Developer',
          ].map((posType) => (
            <FilterChip
              key={posType}
              label={posType}
              selected={filters.positionType === posType}
              onClick={() => handleFilterClick('positionType', posType)}
            />
          ))}
        </div>
      </div>
      {/* Work Experience */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Work Experience</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'Any Experience',
            'Less than 1 year',
            '1-2 years',
            '2-3 years',
            '3-5 years',
            'More than 5 years',
          ].map((we) => (
            <FilterChip
              key={we}
              label={we}
              selected={filters.workExperience === we}
              onClick={() => handleFilterClick('workExperience', we)}
            />
          ))}
        </div>
      </div>
      {/* Location */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Location</h3>
        <div className="flex flex-wrap gap-2">
          {['Any Location', 'United States', 'Ukraine', 'Germany', 'France', 'Remote'].map(
            (loc) => (
              <FilterChip
                key={loc}
                label={loc}
                selected={filters.location === loc}
                onClick={() => handleFilterClick('location', loc)}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}

// -------------- FilterChip ---------------
function FilterChip({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-full border transition
        ${
          selected
            ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-200 dark:text-blue-900'
            : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-gray-200'
        }
      `}
    >
      {label}
    </button>
  );
}

// -------------- ReferralModal ---------------


function ReferralModal({ isOpen, onClose, vacancy }) {
  const { createReferral } = useVacancyStore(); // <--- GET THE store function
  const [referralData, setReferralData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    location: '',
    linkedIn: '',
    resume: null,
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setReferralData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setReferralData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1) Build FormData (if uploading a file)
      const formData = new FormData();
      // 'vacancy.id' is the mapped DB _id
      // Our backend expects 'jobId' among other fields
      formData.append('jobId', vacancy.id);

      formData.append('name', referralData.name);
      formData.append('email', referralData.email);
      formData.append('phone', referralData.phone);
      formData.append('address', referralData.address);
      formData.append('location', referralData.location);
      formData.append('linkedIn', referralData.linkedIn);
      formData.append('notes', referralData.notes);

      if (referralData.resume) {
        formData.append('resume', referralData.resume);
      }

      // 2) Call Zustand action
      const response = await createReferral(formData);

      console.log('Referral submitted successfully:', response);
      alert('Referral submitted successfully!');

      // 3) Clear form and close
      setReferralData({
        name: '',
        email: '',
        phone: '',
        address: '',
        location: '',
        linkedIn: '',
        resume: null,
        notes: '',
      });
      onClose();
    } catch (err) {
      console.error('Error creating referral:', err);
      alert('Failed to create referral. Check console.');
    }
  };

  if (!isOpen || !vacancy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">
          Refer Candidate for: {vacancy.title}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={referralData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={referralData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={referralData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={referralData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={referralData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
            <input
              type="text"
              name="linkedIn"
              value={referralData.linkedIn}
              onChange={handleChange}
              placeholder="e.g. https://linkedin.com/in/username"
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          {/* Resume */}
          <div>
            <label className="block text-sm font-medium mb-1">Resume</label>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              className="block w-full text-sm text-gray-900 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1">Additional Notes</label>
            <textarea
              name="notes"
              value={referralData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit Referral
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------- JobDetailsModal ---------------
function JobDetailsModal({ isOpen, onClose, vacancy }) {
  if (!isOpen || !vacancy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-3">{vacancy.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          <strong>Department:</strong> {vacancy.department} <br />
          <strong>Location:</strong> {vacancy.location} <br />
          <strong>Salary:</strong> ${vacancy.salary.toLocaleString()} <br />
          <strong>Status:</strong> {vacancy.status} <br />
          <strong>Publication:</strong> {vacancy.publication} <br />
          <strong>Position Type:</strong> {vacancy.positionType} <br />
          <strong>Experience:</strong> {vacancy.workExperience} <br />
        </p>
        <div className="mb-4">
          <h3 className="font-medium text-lg mb-1">Job Description:</h3>
          <p className="text-gray-700 dark:text-gray-200">
            {vacancy.description}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
