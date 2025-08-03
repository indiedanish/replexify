"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { useAuth } from '@/lib/contexts/auth-context';
import { uploadContext, getContexts, deleteContext, ContextItem } from '@/lib/services/content-context';

import {
    Upload,
    FileText,
    Trash2,
    Plus,
    File,
    Clock,
    CheckCircle,
    AlertCircle,
    Loader2
} from "lucide-react"

export default function UploadContextPage() {
    const { user } = useAuth();
    const { toast } = useToast();

    const [contexts, setContexts] = useState<ContextItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [contextName, setContextName] = useState("");
    const [contextText, setContextText] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadMethod, setUploadMethod] = useState<"files" | "text">("files");

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load contexts on component mount
    useEffect(() => {
        loadContexts();
    }, []);

    const loadContexts = async () => {
        try {
            setLoading(true);
            const response = await getContexts();
            // The API returns an array directly, not a nested object
            setContexts(response || []);
        } catch (error) {
            console.error("Error loading contexts:", error);
            toast({
                title: "Error",
                description: "Failed to load contexts",
                variant: "destructive",
            });
            // Set empty array on error to prevent undefined issues
            setContexts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length > 10) {
            toast({
                title: "Too many files",
                description: "Maximum 10 files allowed",
                variant: "destructive",
            });
            return;
        }
        setSelectedFiles(files);
    };

    const handleUpload = async () => {
        if (!contextName.trim()) {
            toast({
                title: "Error",
                description: "Context name is required",
                variant: "destructive",
            });
            return;
        }

        if (uploadMethod === "files" && selectedFiles.length === 0) {
            toast({
                title: "Error",
                description: "Please select at least one file",
                variant: "destructive",
            });
            return;
        }

        if (uploadMethod === "text" && !contextText.trim()) {
            toast({
                title: "Error",
                description: "Please enter some text content",
                variant: "destructive",
            });
            return;
        }

        try {
            setUploading(true);

            const uploadData = {
                contextName: contextName.trim(),
                ...(uploadMethod === "files" ? { files: selectedFiles } : { text: contextText.trim() })
            };

            await uploadContext(uploadData);

            toast({
                title: "Success",
                description: "Context uploaded successfully",
            });

            // Reset form
            setContextName("");
            setContextText("");
            setSelectedFiles([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            // Reload contexts
            await loadContexts();
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Upload failed",
                variant: "destructive",
            });
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteContext = async (contextId: number) => {
        try {
            await deleteContext(contextId.toString());
            toast({
                title: "Success",
                description: "Context deleted successfully",
            });
            await loadContexts();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete context",
                variant: "destructive",
            });
        }
    };

    // Simplified status functions since the API doesn't return status
    const getStatusIcon = () => {
        return <CheckCircle className="h-4 w-4 text-green-400" />;
    };

    const getStatusBadge = () => {
        return (
            <Badge
                variant="outline"
                className="text-xs border-green-500/30 text-green-400"
            >
                Active
            </Badge>
        );
    };

    return (
        <div className="min-h-screen bg-black text-white font-geist">
            {/* Header */}
            <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div>
                            <h1 className="text-2xl font-semibold text-white">Context Management</h1>
                            <p className="text-white/60 text-sm">Upload and manage your context documents and text content.</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                onClick={loadContexts}
                                variant="outline"
                                size="sm"
                                className="border-white/20 text-white hover:bg-white/10"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Upload Section */}
                <Card className="bg-black/50 border-white/10 backdrop-blur-sm mb-8">
                    <CardHeader>
                        <CardTitle className="text-white">Upload New Context</CardTitle>
                        <CardDescription className="text-white/60">
                            Upload files or create context with text content
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Context Name */}
                        <div>
                            <label className="text-white/80 text-sm font-medium mb-2 block">
                                Context Name *
                            </label>
                            <Input
                                value={contextName}
                                onChange={(e) => setContextName(e.target.value)}
                                placeholder="Enter context name"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                            />
                        </div>

                        {/* Upload Method Toggle */}
                        <div>
                            <label className="text-white/80 text-sm font-medium mb-2 block">
                                Upload Method
                            </label>
                            <ToggleGroup
                                type="single"
                                value={uploadMethod}
                                onValueChange={(value) => value && setUploadMethod(value as "files" | "text")}
                                className="justify-start"
                            >
                                <div className="bg-white/5 border border-white/20 rounded-lg p-1">

                                
                                <ToggleGroupItem
                                    value="files"
                                    className="data-[state=on]:bg-white data-[state=on]:text-black text-white hover:bg-white/10"
                                >
                                    <File className="h-4 w-4 mr-2" />
                                    Upload Files
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                    value="text"
                                    className="data-[state=on]:bg-white data-[state=on]:text-black text-white hover:bg-white/10"
                                >
                                    <FileText className="h-4 w-4 mr-2" />
                                    Text Content
                                </ToggleGroupItem>
                                </div>
                            </ToggleGroup>
                        </div>

                        {/* File Upload */}
                        {uploadMethod === "files" && (
                            <div>
                                <label className="text-white/80 text-sm font-medium mb-2 block">
                                    Files (Max 10 files)
                                </label>
                                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        onChange={handleFileSelect}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.txt,.md"
                                    />
                                    <Button
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-white/20 text-white hover:bg-white/10 mb-4"
                                    >
                                        <Upload className="h-4 w-4 mr-2" />
                                        Select Files
                                    </Button>
                                    {selectedFiles.length > 0 && (
                                        <div className="space-y-2">
                                            {selectedFiles.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between bg-white/5 p-2 rounded">
                                                    <span className="text-white/80 text-sm">{file.name}</span>
                                                    <span className="text-white/40 text-xs">
                                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Text Content */}
                        {uploadMethod === "text" && (
                            <div>
                                <label className="text-white/80 text-sm font-medium mb-2 block">
                                    Text Content
                                </label>
                                <Textarea
                                    value={contextText}
                                    onChange={(e) => setContextText(e.target.value)}
                                    placeholder="Enter your context text here..."
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[200px]"
                                />
                            </div>
                        )}

                        {/* Upload Button */}
                        <Button
                            onClick={handleUpload}
                            disabled={uploading || !contextName.trim()}
                            className="bg-white hover:bg-gray-100 text-black w-full"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Upload Context
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Contexts List */}
                <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Your Contexts</CardTitle>
                        <CardDescription className="text-white/60">
                            Manage your uploaded contexts and documents
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-white/60" />
                            </div>
                        ) : !contexts || contexts.length === 0 ? (
                            <div className="text-center py-8">
                                <FileText className="h-12 w-12 text-white/20 mx-auto mb-4" />
                                <p className="text-white/60">No contexts uploaded yet</p>
                                <p className="text-white/40 text-sm">Upload your first context above</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {contexts.map((context) => (
                                    <div key={context.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                                                <FileText className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-medium">{context.contextName}</h3>
                                                <div className="flex items-center space-x-4 mt-1">
                                                    {getStatusIcon()}
                                                    {getStatusBadge()}
                                                    <span className="text-white/40 text-sm">
                                                        ID: {context.id}
                                                    </span>
                                                    <span className="text-white/40 text-sm">
                                                        Org ID: {context.organizationId}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteContext(context.id)}
                                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
