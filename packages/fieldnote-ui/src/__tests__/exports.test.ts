import { describe, expect, it } from 'vitest';
import * as fieldnote from '../index.js';

describe('fieldnote-ui public API', () => {
  it('exports the five first-class primitives', () => {
    for (const name of ['ObservationCard', 'EvidenceCard', 'InsightCard', 'DecisionCard', 'LearningCard']) {
      expect(fieldnote).toHaveProperty(name);
    }
  });

  it('exports layouts, charts, tokens, theme and icons from one entry point', () => {
    for (const name of [
      'NotebookLayout',
      'ObservatoryLayout',
      'AssistantLayout',
      'WorkspaceLayout',
      'ResearchLayout',
      'GardenLayout',
      'ObservationChart',
      'EvidenceChart',
      'InsightTrendChart',
      'DecisionImpactChart',
      'LearningChart',
      'FieldNoteProvider',
      'themeInitScript',
      'tokens',
      'createCssVariables',
      'ObservationIcon',
      'KnowledgeNav',
    ]) {
      expect(fieldnote).toHaveProperty(name);
    }
  });
});
