"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore } from "../../store/osStore";
import {
  PREDEFINED_WALLPAPERS,
  PREDEFINED_LOGOS,
} from "../../constants/osData";
import { VscArrowRight, VscCheck, VscAdd, VscTrash } from "react-icons/vsc";

const setupSchema = z.object({
  username: z
    .string()
    .min(2, "Identity parameters require at least 2 characters."),
  wallpaper: z.string().min(1, "System interface wallpaper target required."),
  logo: z.any(), // Modified to allow the full logo object structure
  projects: z
    .array(
      z.object({
        title: z.string().min(1, "Identifier title node missing."),
        description: z
          .string()
          .min(5, "Comprehensive description requires at least 5 characters."),
      }),
    )
    .max(3),
  hobbies: z
    .array(
      z.object({
        name: z.string().min(1, "Activity tag parameters validation fail."),
      }),
    )
    .max(2),
  achievements: z.array(
    z.object({
      title: z
        .string()
        .min(1, "Certificate title valid nomenclature required."),
      organization: z
        .string()
        .min(1, "Valid validation authority node required."),
      year: z
        .string()
        .regex(
          /^\d{4}$/,
          "Timeline timestamp matrix must follow YYYY formatting.",
        ),
    }),
  ),
});

export default function SetupWizard() {
  const completeSetup = useOSStore((state) => state.completeSetup);
  const [step, setStep] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      username: "",
      wallpaper: PREDEFINED_WALLPAPERS[0],
      logo: PREDEFINED_LOGOS[0],
      projects: [
        {
          title: "Syscape Simulator",
          description: "Browser virtualization matrix UI",
        },
      ],
      hobbies: [{ name: "Coding" }],
      achievements: [
        {
          title: "Certified Frontend Core",
          organization: "W3C Node",
          year: "2025",
        },
      ],
    },
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({ control, name: "projects" });

  const {
    fields: hobbyFields,
    append: appendHobby,
    remove: removeHobby,
  } = useFieldArray({ control, name: "hobbies" });

  const {
    fields: achievementFields,
    append: appendAchievement,
    remove: removeAchievement,
  } = useFieldArray({ control, name: "achievements" });

  const currentWallpaper = watch("wallpaper");
  const currentLogo = watch("logo");

  const stepsCount = 4;

  // Final validation success compiler
  const processFormCompilation = (data) => {
    completeSetup(data);
  };

  // Prevent hitting 'Enter' inside input fields from triggering unexpected early form submissions
  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
    ) {
      e.preventDefault();
    }
  };

  // Validates only the current visible fields before moving forward
  const advanceStep = async () => {
    let fieldsToValidate = [];
    if (step === 0) fieldsToValidate = ["username", "wallpaper", "logo"];
    if (step === 1) fieldsToValidate = ["projects"];
    if (step === 2) fieldsToValidate = ["hobbies"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep((p) => Math.min(p + 1, stepsCount - 1));
    }
  };

  const regressStep = () => setStep((p) => Math.max(p - 1, 0));

  // UNIFIED NAVIGATION HANDLER: Solves browser element-swapping click race condition completely
  const handleNavigationAction = () => {
    if (step < stepsCount - 1) {
      advanceStep();
    } else {
      // Manually trigger form validation compilation on the final step
      handleSubmit(processFormCompilation)();
    }
  };

  return (
    <div className="w-full max-w-3xl glass-panel rounded-xl shadow-glass border-cyber-primary/20 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-primary to-transparent animate-pulse" />
      <div className="p-6 md:p-8">
        <header className="mb-8 border-b border-white/10 pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-widest text-cyber-primary uppercase">
              Syscape Initialization Node
            </h1>
            <p className="text-xs text-white/50 font-mono mt-1">
              Configuring virtualization environment parameters.
            </p>
          </div>
          <div className="text-xs font-mono text-cyber-secondary">
            STEP {step + 1} OF {stepsCount}
          </div>
        </header>

        <form
          onSubmit={(e) => e.preventDefault()} // Block native automatic form actions completely
          onKeyDown={handleKeyDown}
          className="space-y-6"
        >
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ x: 15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -15, opacity: 0 }}
                className="space-y-5"
              >
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Identity Setup Parameters
                </h3>

                {/* Scroll Containment Layer for Step 0 Fields */}
                <div className="space-y-4 max-h-[260px] md:max-h-[320px] overflow-y-auto pr-1">
                  <div>
                    <label className="block text-xs uppercase mb-2 text-cyber-text/80">
                      User Identity Token (Username)
                    </label>
                    <input
                      type="text"
                      {...register("username")}
                      className="w-full p-3 rounded glass-input font-mono"
                      placeholder="e.g., Operator"
                    />
                    {errors.username && (
                      <p className="text-xs text-cyber-secondary mt-1">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs uppercase mb-2 text-cyber-text/80">
                        Select Dynamic Matrix Wallpaper
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {PREDEFINED_WALLPAPERS.map((wall, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setValue("wallpaper", wall)}
                            style={{ backgroundImage: wall }}
                            className={`w-12 h-12 rounded border relative transition-all ${currentWallpaper === wall ? "border-cyber-primary scale-95 ring-1 ring-cyber-primary" : "border-white/10"}`}
                          >
                            {currentWallpaper === wall && (
                              <VscCheck className="absolute inset-0 m-auto text-white drop-shadow-md" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase mb-2 text-cyber-text/80">
                        Select Core Engine Logo Identity
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {PREDEFINED_LOGOS.map((logo) => (
                          <button
                            key={logo.id}
                            type="button"
                            onClick={() => setValue("logo", logo)}
                            className={`p-2.5 rounded border flex items-center justify-center text-xs font-mono transition-all relative ${
                              currentLogo?.id === logo.id
                                ? "bg-cyber-primary/10 border-cyber-primary text-cyber-primary"
                                : "bg-white/5 border-white/10 text-white/70"
                            }`}
                          >
                            <img
                              src={logo.image}
                              alt={logo.name}
                              className="w-6 h-6 object-contain"
                            />
                            <span className="truncate ml-1">{logo.name}</span>
                            {currentLogo?.id === logo.id && (
                              <VscCheck className="absolute text-white drop-shadow-md right-1 top-1 text-[10px]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -15, opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Project Storage Directory (Max 3)
                  </h3>
                  {projectFields.length < 3 && (
                    <button
                      type="button"
                      onClick={() =>
                        appendProject({ title: "", description: "" })
                      }
                      className="text-xs bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/40 px-2 py-1 rounded flex items-center gap-1 hover:bg-cyber-primary/30 transition-all"
                    >
                      <VscAdd /> Add Registry Entry
                    </button>
                  )}
                </div>

                {/* Scroll Containment Layer for Step 1 Project Registry Entries */}
                <div className="space-y-3 max-h-[260px] md:max-h-[320px] overflow-y-auto pr-1">
                  {projectFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="p-4 bg-black/30 border border-white/5 rounded relative space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-cyber-primary">
                          PROJECT_NODE_0{index + 1}
                        </span>
                        {projectFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProject(index)}
                            className="text-cyber-secondary hover:text-red-400 transition-colors"
                          >
                            <VscTrash size={14} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <input
                          type="text"
                          {...register(`projects.${index}.title`)}
                          placeholder="Project File Title"
                          className="p-2 text-xs rounded glass-input"
                        />
                        {errors.projects?.[index]?.title && (
                          <p className="text-[10px] text-cyber-secondary">
                            {errors.projects[index].title.message}
                          </p>
                        )}

                        <textarea
                          {...register(`projects.${index}.description`)}
                          placeholder="Deployment overview and framework specifications..."
                          rows={2}
                          className="p-2 text-xs rounded glass-input resize-none"
                        />
                        {errors.projects?.[index]?.description && (
                          <p className="text-[10px] text-cyber-secondary">
                            {errors.projects[index].description.message}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -15, opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Hobby Executables Matrix (Max 2)
                  </h3>
                  {hobbyFields.length < 2 && (
                    <button
                      type="button"
                      onClick={() => appendHobby({ name: "" })}
                      className="text-xs bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/40 px-2 py-1 rounded flex items-center gap-1 hover:bg-cyber-primary/30 transition-all"
                    >
                      <VscAdd /> Mount Thread
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hobbyFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="p-4 bg-black/30 border border-white/5 rounded space-y-2 relative"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-cyber-primary">
                          HOBBY_EXE_0{index + 1}
                        </span>
                        {hobbyFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeHobby(index)}
                            className="text-cyber-secondary hover:text-red-400 transition-colors"
                          >
                            <VscTrash size={14} />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        {...register(`hobbies.${index}.name`)}
                        placeholder="e.g., Photography, Gaming"
                        className="p-2 text-xs w-full rounded glass-input"
                      />
                      {errors.hobbies?.[index]?.name && (
                        <p className="text-[10px] text-cyber-secondary">
                          {errors.hobbies[index].name.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -15, opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Validation Certifications Registry
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      appendAchievement({
                        title: "",
                        organization: "",
                        year: "",
                      })
                    }
                    className="text-xs bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/40 px-2 py-1 rounded flex items-center gap-1 hover:bg-cyber-primary/30 transition-all"
                  >
                    <VscAdd /> Register Credential
                  </button>
                </div>

                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {achievementFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="p-3 bg-black/30 border border-white/5 rounded grid grid-cols-1 sm:grid-cols-3 gap-2 relative items-end"
                    >
                      <div>
                        <label className="block text-[10px] text-white/40 uppercase mb-1">
                          Certificate Title
                        </label>
                        <input
                          type="text"
                          {...register(`achievements.${index}.title`)}
                          className="p-2 text-xs w-full rounded glass-input"
                        />
                        {errors.achievements?.[index]?.title && (
                          <p className="text-[9px] text-cyber-secondary mt-0.5">
                            {errors.achievements[index].title.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[10px] text-white/40 uppercase mb-1">
                          Organization
                        </label>
                        <input
                          type="text"
                          {...register(`achievements.${index}.organization`)}
                          className="p-2 text-xs w-full rounded glass-input"
                        />
                        {errors.achievements?.[index]?.organization && (
                          <p className="text-[9px] text-cyber-secondary mt-0.5">
                            {errors.achievements[index].organization.message}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="block text-[10px] text-white/40 uppercase mb-1">
                            Year
                          </label>
                          <input
                            type="text"
                            {...register(`achievements.${index}.year`)}
                            placeholder="YYYY"
                            className="p-2 text-xs w-full rounded glass-input"
                          />
                          {errors.achievements?.[index]?.year && (
                            <p className="text-[9px] text-cyber-secondary mt-0.5">
                              {errors.achievements[index].year.message}
                            </p>
                          )}
                        </div>
                        {achievementFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAchievement(index)}
                            className="text-cyber-secondary hover:text-red-400 mb-1"
                          >
                            <VscTrash size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {step === 3 &&
            errors.achievements &&
            Array.isArray(errors.achievements) && (
              <div className="p-3 rounded border border-cyber-secondary/30 bg-cyber-secondary/5 font-mono text-xs text-cyber-secondary space-y-1">
                <span className="font-bold uppercase tracking-wider block">
                  System compilation error payload:
                </span>
                {errors.achievements.map(
                  (err, idx) =>
                    err && (
                      <p key={idx}>
                        Node Block 0{idx + 1}:{" "}
                        {err?.title?.message ||
                          err?.organization?.message ||
                          err?.year?.message}
                      </p>
                    ),
                )}
              </div>
            )}

          {/* Navigation Controls Controller Layer */}
          <div className="flex justify-between items-center pt-4 border-t border-white/10 font-mono text-xs">
            <button
              type="button"
              onClick={regressStep}
              disabled={step === 0}
              className={`px-4 py-2 rounded transition-all ${step === 0 ? "opacity-30 cursor-not-allowed text-white/40" : "bg-white/5 border border-white/20 text-white hover:bg-white/10"}`}
            >
              PREV
            </button>

            <button
              type="button"
              onClick={handleNavigationAction}
              className={
                step < stepsCount - 1
                  ? "px-4 py-2 bg-cyber-primary/20 border border-cyber-primary/50 text-cyber-primary rounded hover:bg-cyber-primary/30 flex items-center gap-2 transition-all"
                  : "px-5 py-2 bg-gradient-to-r from-cyber-primary to-cyber-secondary text-black font-bold rounded shadow-neon hover:brightness-110 flex items-center gap-2 transition-all"
              }
            >
              {step < stepsCount - 1 ? (
                <>
                  NEXT <VscArrowRight />
                </>
              ) : (
                <>
                  COMPILE ENVIRONMENT <VscCheck />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
