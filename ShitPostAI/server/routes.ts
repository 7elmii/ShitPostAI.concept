import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { insertResumeSchema, insertDeveloperApplicationSchema, insertAiQuerySchema } from "@shared/schema";
import { z } from "zod";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Resume upload endpoint
  app.post("/api/resumes", upload.single('resume'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Resume file is required" });
      }

      const resumeData = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone || null,
        desiredPosition: req.body.desiredPosition || null,
        fileName: req.file.originalname,
        fileSize: `${Math.round(req.file.size / 1024)}KB`,
        additionalInfo: req.body.additionalInfo || null,
      };

      const validatedData = insertResumeSchema.parse(resumeData);
      const resume = await storage.createResume(validatedData);
      
      res.json(resume);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to upload resume" });
    }
  });

  // Get all resumes (for admin purposes)
  app.get("/api/resumes", async (req, res) => {
    try {
      const resumes = await storage.getAllResumes();
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resumes" });
    }
  });

  // Developer application endpoint
  app.post("/api/developer-applications", async (req, res) => {
    try {
      const validatedData = insertDeveloperApplicationSchema.parse(req.body);
      const application = await storage.createDeveloperApplication(validatedData);
      
      res.json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit application" });
    }
  });

  // Get all developer applications
  app.get("/api/developer-applications", async (req, res) => {
    try {
      const applications = await storage.getAllDeveloperApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  // AI query endpoint
  app.post("/api/ai-queries", async (req, res) => {
    try {
      const { query } = req.body;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: "Query is required" });
      }

      // Generate AI response based on query content
      let response = "";
      
      if (query.toLowerCase().includes('resume')) {
        response = `
          <div class="border-l-4 border-indigo-500 pl-4 mb-4">
            <h5 class="font-semibold text-indigo-700">Resume Analysis</h5>
            <p>Based on your resume query, here are some personalized recommendations:</p>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-white rounded-lg p-4 border">
              <h6 class="font-medium mb-2">✅ Key Strengths</h6>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Strong technical skills</li>
                <li>• Relevant work experience</li>
                <li>• Clear career progression</li>
              </ul>
            </div>
            <div class="bg-white rounded-lg p-4 border">
              <h6 class="font-medium mb-2">🎯 Improvement Areas</h6>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Add quantifiable achievements</li>
                <li>• Include relevant keywords</li>
                <li>• Optimize formatting</li>
              </ul>
            </div>
          </div>
        `;
      } else if (query.toLowerCase().includes('interview')) {
        response = `
          <div class="border-l-4 border-purple-500 pl-4 mb-4">
            <h5 class="font-semibold text-purple-700">Interview Preparation</h5>
            <p>Here are key tips to excel in your upcoming interviews:</p>
          </div>
          <div class="space-y-4">
            <div class="bg-purple-50 rounded-lg p-4">
              <h6 class="font-medium mb-2">📋 Common Questions to Prepare</h6>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Tell me about yourself</li>
                <li>• Why do you want this position?</li>
                <li>• What are your greatest strengths?</li>
                <li>• Describe a challenging project you worked on</li>
              </ul>
            </div>
            <div class="bg-blue-50 rounded-lg p-4">
              <h6 class="font-medium mb-2">💡 Pro Tips</h6>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Research the company thoroughly</li>
                <li>• Prepare specific examples using STAR method</li>
                <li>• Practice your elevator pitch</li>
                <li>• Have questions ready for the interviewer</li>
              </ul>
            </div>
          </div>
        `;
      } else if (query.toLowerCase().includes('career')) {
        response = `
          <div class="border-l-4 border-emerald-500 pl-4 mb-4">
            <h5 class="font-semibold text-emerald-700">Career Path Guidance</h5>
            <p>Based on your career interests, here's a roadmap for professional growth:</p>
          </div>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-emerald-50 rounded-lg p-4">
              <h6 class="font-medium mb-2">🎯 Short-term (6 months)</h6>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Update LinkedIn profile</li>
                <li>• Build portfolio projects</li>
                <li>• Network with industry professionals</li>
              </ul>
            </div>
            <div class="bg-blue-50 rounded-lg p-4">
              <h6 class="font-medium mb-2">📈 Medium-term (1-2 years)</h6>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Gain specialized skills</li>
                <li>• Take on leadership roles</li>
                <li>• Pursue relevant certifications</li>
              </ul>
            </div>
            <div class="bg-purple-50 rounded-lg p-4">
              <h6 class="font-medium mb-2">🚀 Long-term (3+ years)</h6>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Target senior positions</li>
                <li>• Consider specialization areas</li>
                <li>• Build industry reputation</li>
              </ul>
            </div>
          </div>
        `;
      } else {
        response = `
          <div class="border-l-4 border-cyan-500 pl-4 mb-4">
            <h5 class="font-semibold text-cyan-700">General Career Advice</h5>
            <p>Here are some personalized insights based on your query:</p>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-white rounded-lg p-4 border">
              <h6 class="font-medium mb-2">💼 Professional Development</h6>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Focus on continuous learning</li>
                <li>• Build a strong professional network</li>
                <li>• Seek mentorship opportunities</li>
              </ul>
            </div>
            <div class="bg-white rounded-lg p-4 border">
              <h6 class="font-medium mb-2">🎯 Next Steps</h6>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Set clear career goals</li>
                <li>• Update your skills regularly</li>
                <li>• Consider market trends</li>
              </ul>
            </div>
          </div>
        `;
      }

      const aiQueryData = { query, response };
      const validatedData = insertAiQuerySchema.parse(aiQueryData);
      const aiQuery = await storage.createAiQuery(validatedData);
      
      res.json(aiQuery);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to process AI query" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
