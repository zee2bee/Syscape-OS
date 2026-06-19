"use client";

import React, { useState, useEffect } from "react";
import {
  VscFile,
  VscNewFile,
  VscSave,
  VscTrash,
  VscCopy,
  VscCheck,
  VscEdit,
} from "react-icons/vsc";

export default function NotesApp() {
  const [notes, setNotes] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("syscape_notes");
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: "welcome-node",
              title: "System_Log.txt",
              content:
                "Welcome to CyberNotes v1.0.\nUse this secure memory layer to stage configuration details, copy-paste snippets, or draft terminal execution scripts.",
              updatedAt: new Date().toLocaleDateString(),
            },
          ];
    }
    return [];
  });

  const [activeNoteId, setActiveNoteId] = useState(notes[0]?.id || null);
  const [editorContent, setEditorContent] = useState("");
  const [editorTitle, setEditorTitle] = useState("");
  const [copied, setCopied] = useState(false);

  const activeNote = notes.find((n) => n.id === activeNoteId);

  // Sync editor with active note
  useEffect(() => {
    if (activeNote) {
      setEditorContent(activeNote.content);
      setEditorTitle(activeNote.title);
    } else {
      setEditorContent("");
      setEditorTitle("");
    }
  }, [activeNoteId]);

  // Save changes to localStorage
  const saveNotesToDisk = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem("syscape_notes", JSON.stringify(updatedNotes));
  };

  const createNewNote = () => {
    const newId = `note_${Date.now()}`;
    const newNote = {
      id: newId,
      title: "untitled_node.txt",
      content: "",
      updatedAt: new Date().toLocaleDateString(),
    };
    saveNotesToDisk([newNote, ...notes]);
    setActiveNoteId(newId);
  };

  const handleUpdateNote = () => {
    if (!activeNoteId) return;
    const updated = notes.map((note) => {
      if (note.id === activeNoteId) {
        return {
          ...note,
          title: editorTitle.trim() || "untitled_node.txt",
          content: editorContent,
          updatedAt: new Date().toLocaleDateString(),
        };
      }
      return note;
    });
    saveNotesToDisk(updated);
  };

  const handleDeleteNote = (idToDelete, e) => {
    if (e) e.stopPropagation();
    const updated = notes.filter((n) => n.id !== idToDelete);
    saveNotesToDisk(updated);
    if (activeNoteId === idToDelete) {
      setActiveNoteId(updated[0]?.id || null);
    }
  };

  const copyToClipboard = async () => {
    if (!editorContent) return;
    try {
      await navigator.clipboard.writeText(editorContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to extract data payload to host clipboard", err);
    }
  };

  return (
    <div className="w-full h-full flex bg-black/40 text-white font-mono text-xs select-none">
      {/* File Registry Sidebar */}
      <div className="w-48 border-r border-white/10 flex flex-col bg-black/20 shrink-0">
        <div className="p-2 border-b border-white/10">
          <button
            type="button"
            onClick={createNewNote}
            className="w-full p-2 rounded bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary hover:bg-cyber-primary/20 flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <VscNewFile size={14} /> NEW NODE
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`p-2 rounded flex items-center justify-between cursor-pointer group transition-all ${
                activeNoteId === note.id
                  ? "bg-white/10 text-cyber-primary border border-white/10"
                  : "hover:bg-white/5 text-white/60"
              }`}
            >
              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                <VscFile size={12} className="shrink-0" />
                <span className="truncate">{note.title}</span>
              </div>
              <button
                type="button"
                onClick={(e) => handleDeleteNote(note.id, e)}
                className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-cyber-secondary transition-opacity p-0.5"
              >
                <VscTrash size={12} />
              </button>
            </div>
          ))}
          {notes.length === 0 && (
            <div className="text-center text-[10px] text-white/30 pt-8 uppercase tracking-widest">
              Registry Empty
            </div>
          )}
        </div>
      </div>

      {/* Main Node Text Editor Interface */}
      <div className="flex-1 flex flex-col min-w-0">
        {activeNoteId ? (
          <>
            {/* Editor Top Control Strip */}
            <div className="p-2 border-b border-white/10 flex items-center justify-between bg-black/10">
              <div className="flex items-center gap-2 flex-1 max-w-xs">
                <VscEdit className="text-cyber-primary shrink-0" size={14} />
                <input
                  type="text"
                  value={editorTitle}
                  onChange={(e) => setEditorTitle(e.target.value)}
                  onBlur={handleUpdateNote}
                  className="bg-transparent border-b border-transparent hover:border-white/10 focus:border-cyber-primary focus:outline-none p-0.5 font-bold truncate text-white w-full transition-colors"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  title="Copy payload to host clipboard"
                  className="p-1.5 rounded border border-white/10 hover:bg-white/5 text-white/70 transition-all flex items-center gap-1"
                >
                  {copied ? (
                    <VscCheck className="text-green-400" size={14} />
                  ) : (
                    <VscCopy size={14} />
                  )}
                  <span className="text-[10px] hidden sm:inline">
                    {copied ? "COPIED" : "COPY"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleUpdateNote}
                  className="p-1.5 rounded bg-cyber-primary/20 border border-cyber-primary/50 text-cyber-primary hover:bg-cyber-primary/30 transition-all flex items-center gap-1"
                >
                  <VscSave size={14} />
                  <span className="text-[10px] font-bold hidden sm:inline">
                    SAVE
                  </span>
                </button>
              </div>
            </div>

            {/* Editing Workspace Canvas */}
            <div className="flex-1 p-3 relative">
              <textarea
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                onBlur={handleUpdateNote}
                placeholder="Initialize text sequence payload matrix here..."
                className="w-full h-full bg-transparent resize-none outline-none border-none text-white/90 leading-relaxed font-mono focus:ring-0 p-0 selection:bg-cyber-primary/30 selection:text-white"
              />
            </div>

            {/* Editor Telemetry Status Footer */}
            <div className="px-3 py-1 border-t border-white/10 bg-black/30 flex justify-between items-center text-[10px] text-white/40">
              <div>LAST COMPILE: {activeNote?.updatedAt}</div>
              <div className="tracking-widest">
                LENGTH: {editorContent.length} | LINES:{" "}
                {editorContent.split("\n").length}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-white/30 space-y-2 uppercase tracking-widest text-[10px]">
            <div>No active data stream selected</div>
            <button
              type="button"
              onClick={createNewNote}
              className="px-3 py-1.5 rounded border border-white/10 text-white/50 hover:text-cyber-primary hover:border-cyber-primary/40 transition-colors"
            >
              Mount File System Node
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
