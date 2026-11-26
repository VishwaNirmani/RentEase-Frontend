import { useState } from "react";
import { useAuth } from "../context/useAuth";

function getProfileValues(user) {
  return {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    role: user?.role || "",
  };
}

const profileFields = [
  { name: "firstName", label: "First Name", type: "text", editable: true },
  { name: "lastName", label: "Last Name", type: "text", editable: true },
  { name: "email", label: "Email Address", type: "email", editable: false },
  { name: "phoneNumber", label: "Phone Number", type: "tel", editable: true },
  { name: "role", label: "Account Role", type: "text", editable: false },
];

function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(() => getProfileValues(user));
  const [formData, setFormData] = useState(() => getProfileValues(user));
  const [isEditing, setIsEditing] = useState(false);
  const [notice, setNotice] = useState("");

  const startEditing = () => {
    setFormData(profile);
    setNotice("");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setFormData(profile);
    setNotice("");
    setIsEditing(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    setNotice(
      "Preview updated locally. Profile changes are not connected to an update service and were not saved to your account.",
    );
  };

  return (
    <section className="min-h-[70vh] bg-cream px-5 py-12 sm:px-8 md:py-16">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-brand">
            ACCOUNT SETTINGS
          </p>
          <h1 className="mt-2 text-3xl font-bold text-brand-dark md:text-4xl">
            My Profile
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-ink/60">
            View the account information currently available to RentEase.
          </p>
        </header>

        <div
          role="note"
          className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900"
        >
          Profile updates are not connected to a backend yet. Saving changes
          here only updates a temporary page preview.
        </div>

        {notice && (
          <p
            role="status"
            className="mb-6 rounded-xl border border-brand/15 bg-brand-light/50 px-4 py-3 text-sm leading-6 text-brand-dark"
          >
            {notice}
          </p>
        )}

        <form
          onSubmit={handleSave}
          className="rounded-2xl border border-brand/10 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-brand/10 pb-5">
            <div>
              <h2 className="text-lg font-bold text-brand-dark">
                Account information
              </h2>
              <p className="mt-1 text-sm text-ink/55">
                Your role and email address are managed by your account.
              </p>
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={startEditing}
                className="rounded-xl border border-brand/20 px-4 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand/30"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {profileFields.map((field) => {
              const value = isEditing ? formData[field.name] : profile[field.name];

              return (
                <div key={field.name}>
                  <label
                    htmlFor={`profile-${field.name}`}
                    className="mb-2 block text-sm font-semibold text-brand-dark"
                  >
                    {field.label}
                  </label>
                  {isEditing ? (
                    <input
                      id={`profile-${field.name}`}
                      type={field.type}
                      value={value}
                      readOnly={!field.editable}
                      placeholder={
                        field.editable
                          ? "Not available in the current account session"
                          : undefined
                      }
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          [field.name]: event.target.value,
                        }))
                      }
                      className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-brand/10 ${
                        field.editable
                          ? "border-gray-200 focus:border-brand"
                          : "border-gray-100 bg-gray-50 text-ink/60"
                      }`}
                    />
                  ) : (
                    <p className="min-h-12 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-ink">
                      {value || "Not available in the current account session"}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {isEditing && (
            <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-brand/10 pt-6">
              <button
                type="button"
                onClick={cancelEditing}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Profile;
