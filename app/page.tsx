"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { saveToNotion } from "@/lib/notion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [inputTitle, setTitleInput] = useState("");
  const [inputCategory, setCategoryInput] = useState("");
  const [inputField, setFieldInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitLearning = async () => {
    setLoading(true);
    try {
      // 1. Save to Notion (for now, we won't use Gemini, just save directly)
      const saveRes = await saveToNotion(inputTitle, inputCategory, inputField);
      if (saveRes.success) {
        alert("Save complete! Please check Notion.");
        setTitleInput("");
        setCategoryInput("");
        setFieldInput("");
      }
    } catch (e) {
      alert("An error occurred");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      <h2 className="text-2xl font-bold mb-4 mt-8">
        Quickly Send Anything to Notion
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page reload
          handleSubmitLearning(); // Call the function using the current state values
        }}
        className="space border rounded-lg p-4 mb-4"
      >
        <Field className="mb-4">
          <FieldLabel>Title</FieldLabel>
          <Input
            className="w-full p-4 border rounded text-black"
            value={inputTitle}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Enter title..."
          />
        </Field>
        <Field className="mb-4">
          <FieldLabel>Category</FieldLabel>
          <Select value={inputCategory} onValueChange={setCategoryInput}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="next.js">Next.js</SelectItem>
              <SelectItem value="flutter">Flutter</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel>Notion Page Contents</FieldLabel>
          <Textarea
            className="w-full p-4 border rounded text-black"
            rows={5}
            value={inputField}
            onChange={(e) => setFieldInput(e.target.value)}
            placeholder="Enter in md format..."
          />
        </Field>

        <Button
          type="submit"
          disabled={loading}
          className="mt-4 bg-black text-white px-6 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Save to Notion"}
        </Button>
      </form>
    </main>
  );
}
