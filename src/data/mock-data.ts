// src/data/mock-data.ts
import { Asset, Project } from "../types";

export const MOCK_PROJECT: Project = {
  id: "proj-001",
  title: "The Last Analog Summer",
  synopsis: "A deep dive into the 1994 transition from film to digital in independent cinema.",
  intended_distribution: "Theatrical / Streaming (Netflix)",
};

export const MOCK_ASSETS: Asset[] = [
  {
    id: "as-1",
    asset_name: "Apollo 11 Launch - Wide Angle",
    asset_type: "Video",
    thumbnail_url: "https://picsum.photos/seed/apollo/200/120",
    detected_source: "NASA Archives",
    copyright_status: "Public Domain",
    risk_level: "Low",
    workflow_stage: "Cleared",
    ai_confidence_score: 0.98,
    last_updated: "2024-03-20",
    rights_holder: {
      id: "rh-1",
      name: "Public Domain",
      contact_email: "archives@nasa.gov",
      organization: "NASA",
    }
  },
  {
    id: "as-2",
    asset_name: "1994 NYC Street Scene - Lower East Side",
    asset_type: "Image",
    thumbnail_url: "https://picsum.photos/seed/nyc/200/120",
    detected_source: "Getty Images (Candidate)",
    copyright_status: "Copyrighted",
    risk_level: "High",
    workflow_stage: "Searching",
    ai_confidence_score: 0.82,
    last_updated: "2024-03-22",
    rights_holder: {
      id: "rh-2",
      name: "Stephen Shore (Probable)",
      contact_email: "licensing@stephenshore.net",
      organization: "303 Gallery",
    }
  },
  {
    id: "as-3",
    asset_name: "Ambient Jazz Club Recording",
    asset_type: "Audio",
    thumbnail_url: "https://picsum.photos/seed/jazz/200/120",
    detected_source: "Unknown / Orphan",
    copyright_status: "Orphan Work",
    risk_level: "Medium",
    workflow_stage: "Pending Response",
    ai_confidence_score: 0.45,
    last_updated: "2024-03-21",
    rights_holder: {
      id: "rh-3",
      name: "Village Vanguard (Unconfirmed)",
      contact_email: "info@villagevanguard.com",
      organization: "Village Vanguard",
    }
  }
];
