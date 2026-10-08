import { describe, expect, it } from 'vitest';
import * as fieldnote from '../index.js';
import * as server from '../server.js';

describe('fieldnote-ui public API', () => {
  it('exports the five first-class primitives', () => {
    for (const name of ['ObservationCard', 'EvidenceCard', 'InsightCard', 'DecisionCard', 'LearningCard']) {
      expect(fieldnote).toHaveProperty(name);
    }
  });

  it('exports layouts, charts, theme and icons from the client entry point', () => {
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
      'ObservationIcon',
      'KnowledgeNav',
    ]) {
      expect(fieldnote).toHaveProperty(name);
    }
  });

  it('keeps server-safe helpers on fieldnote-ui/server (callable from RSC)', () => {
    for (const name of ['tokens', 'createCssVariables', 'themeInitScript', 'DEFAULT_STORAGE_KEY']) {
      expect(server).toHaveProperty(name);
    }
    expect(typeof server.themeInitScript()).toBe('string');
    expect(server.tokens.intents).toContain('decision');
  });
});
