/* storage-config.js — Stage 7F canonical browser-storage key ownership.
   Existing key values are intentionally preserved so deployed user data remains compatible. */
(function(root){
  'use strict';

  const namespace=String(root.TRIP_CONFIG&&root.TRIP_CONFIG.storageNamespace||'').trim();
  if(!namespace) throw new Error('TRIP_CONFIG.storageNamespace is required before storage-config.js');

  // New generator trips use isolated storage. Existing deployments preserve legacy keys unless opted in.
  const isolated=Boolean(root.TRIP_CONFIG&&root.TRIP_CONFIG.isolatedLocalStorage);
  const key=(legacy)=>isolated?namespace+':'+legacy:legacy;
  const keys=Object.freeze({
    checklist:key('checklist'),
    expenses:key('expenses'),
    momentPrefix:key('moment_'),
    latestMomentPrefix:key('moment_latest_'),
    momentsFreeform:key('moments_freeform'),
    momentsList:key('moments_list'),
    friend:String(root.TRIP_CONFIG&&root.TRIP_CONFIG.identityStorageKey||namespace+':traveller_identity:v1'),
    adminMode:key('travel_engine_admin_mode_v1'),
    adminDraft:key('travel_engine_admin_draft_v1'),
    guideNavContext:key('ccmv_guide_nav_context'),
    guideNavReopen:key('ccmv_guide_nav_reopen'),
    itineraryOverrides:key('travel_engine_itinerary_overrides_v1'),
    itineraryMasterSignature:key('travel_engine_itinerary_master_signature_v1'),
    tripCompletion:key('travel_engine_trip_completion_v1'),
    changedPlans:key('travel_engine_changed_plans_v1'),
    cloudSnapshot:key('travel_engine_cloud_snapshot_v1'),
    cloudSyncMeta:key('travel_engine_cloud_sync_meta_v1'),
    cloudReloadMarker:key('travel_engine_cloud_reload_version_v1'),
    expenseSyncTombstones:key('travel_engine_expense_tombstones_v1'),
    expenseSyncMeta:key('travel_engine_expense_sync_meta_v1'),
    canonicalExpenseState:namespace+':canonical_expenses:stage_3_2d:v1',
    expenseReadShadowState:namespace+':canonical_expense_read_shadow:stage_3_2e:v1',
    tripGeneration:key('travel_engine_trip_generation_v1'),
    bookingOverrides:namespace+':booking_overrides:v2',
    analyticsQueue:namespace+':analytics_queue:v1',
    analyticsSession:key('travel_engine_analytics_session_v1')
  });

  const domains=Object.freeze({
    identity:Object.freeze({friend:keys.friend}),
    checklist:Object.freeze({state:keys.checklist}),
    expenses:Object.freeze({records:keys.expenses,tombstones:keys.expenseSyncTombstones,syncMetadata:keys.expenseSyncMeta}),
    canonicalExpenses:Object.freeze({state:keys.canonicalExpenseState}),
    expenseReadShadow:Object.freeze({state:keys.expenseReadShadowState}),
    moments:Object.freeze({records:keys.momentsList,freeform:keys.momentsFreeform,legacyPrefix:keys.momentPrefix,latestPrefix:keys.latestMomentPrefix}),
    admin:Object.freeze({mode:keys.adminMode,draft:keys.adminDraft}),
    guide:Object.freeze({context:keys.guideNavContext,reopen:keys.guideNavReopen}),
    itinerary:Object.freeze({overrides:keys.itineraryOverrides,masterSignature:keys.itineraryMasterSignature}),
    bookings:Object.freeze({overrides:keys.bookingOverrides}),
    completion:Object.freeze({state:keys.tripCompletion}),
    journey:Object.freeze({changedPlans:keys.changedPlans}),
    sync:Object.freeze({snapshot:keys.cloudSnapshot,metadata:keys.cloudSyncMeta,reloadMarker:keys.cloudReloadMarker}),
    analytics:Object.freeze({queue:keys.analyticsQueue,session:keys.analyticsSession})
  });

  root.STORAGE_CONFIG=Object.freeze({
    appPrefix:'travel_engine',
    version:1,
    keys,
    domains
  });
})(globalThis);
