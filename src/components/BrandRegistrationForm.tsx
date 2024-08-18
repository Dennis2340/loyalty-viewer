"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const BrandRegistrationForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { startUpload, isUploading } = useUploadThing("freePlanUploader");
  const { toast } = useToast();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setLogo(file);
    }
  };

  const handleLogoUpload = async (): Promise<void> => {
    if (logo) {
      const res = await startUpload([logo]);
      const [responseFile] = res || [];
      setLogoUrl(responseFile?.url || "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, logoUrl, websiteUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to register brand.");
      }

      toast({
        title: "Brand Registered",
        description: "Your brand has been registered successfully.",
      });

      // Optionally redirect or update the UI to show the new brand's info
    } catch (error: any) {
      toast({
        title: "Error Occurred",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (logoUrl) {
      setLogo(null);
    }
  }, [logoUrl]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name" className="text-gray-700">
          Brand Name
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter the brand name..."
          className="mt-1 block w-full"
          required
        />
      </div>

      <div>
        <Label htmlFor="description" className="text-gray-700">
          Brand Description
        </Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a brief description..."
          className="mt-1 block w-full"
          required
        />
      </div>

      <div>
        <Label htmlFor="logo" className="text-gray-700">
          Logo
        </Label>
        <Input
          id="logo"
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="mt-1 block w-full"
        />
        {logoUrl && (
          <div className="mt-2">
            <img
              src={logoUrl}
              alt="Logo preview"
              className="w-16 h-16 object-cover"
              width={64}
              height={64}
            />
          </div>
        )}
        <Button onClick={handleLogoUpload} className="mt-2" disabled={isUploading}>
          Upload {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
        </Button>
      </div>

      <div>
        <Label htmlFor="websiteUrl" className="text-gray-700">
          Website URL
        </Label>
        <Input
          id="websiteUrl"
          type="url"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          placeholder="https://example.com"
          className="mt-1 block w-full"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Register Brand"}
      </Button>
    </form>
  );
};

export default BrandRegistrationForm;
