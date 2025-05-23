/* tslint:disable */
/* eslint-disable */
/**
 * OpenHPC
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { MemStatInfo } from './MemStatInfo';
import {
    MemStatInfoFromJSON,
    MemStatInfoFromJSONTyped,
    MemStatInfoToJSON,
    MemStatInfoToJSONTyped,
} from './MemStatInfo';
import type { GPUStatInfo } from './GPUStatInfo';
import {
    GPUStatInfoFromJSON,
    GPUStatInfoFromJSONTyped,
    GPUStatInfoToJSON,
    GPUStatInfoToJSONTyped,
} from './GPUStatInfo';
import type { CPUStatInfo } from './CPUStatInfo';
import {
    CPUStatInfoFromJSON,
    CPUStatInfoFromJSONTyped,
    CPUStatInfoToJSON,
    CPUStatInfoToJSONTyped,
} from './CPUStatInfo';

/**
 * 
 * @export
 * @interface StatInfo
 */
export interface StatInfo {
    /**
     * 
     * @type {Array<GPUStatInfo>}
     * @memberof StatInfo
     */
    gpu: Array<GPUStatInfo>;
    /**
     * 
     * @type {CPUStatInfo}
     * @memberof StatInfo
     */
    cpu: CPUStatInfo;
    /**
     * 
     * @type {MemStatInfo}
     * @memberof StatInfo
     */
    mem: MemStatInfo;
}

/**
 * Check if a given object implements the StatInfo interface.
 */
export function instanceOfStatInfo(value: object): value is StatInfo {
    if (!('gpu' in value) || value['gpu'] === undefined) return false;
    if (!('cpu' in value) || value['cpu'] === undefined) return false;
    if (!('mem' in value) || value['mem'] === undefined) return false;
    return true;
}

export function StatInfoFromJSON(json: any): StatInfo {
    return StatInfoFromJSONTyped(json, false);
}

export function StatInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): StatInfo {
    if (json == null) {
        return json;
    }
    return {
        
        'gpu': ((json['gpu'] as Array<any>).map(GPUStatInfoFromJSON)),
        'cpu': CPUStatInfoFromJSON(json['cpu']),
        'mem': MemStatInfoFromJSON(json['mem']),
    };
}

export function StatInfoToJSON(json: any): StatInfo {
    return StatInfoToJSONTyped(json, false);
}

export function StatInfoToJSONTyped(value?: StatInfo | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'gpu': ((value['gpu'] as Array<any>).map(GPUStatInfoToJSON)),
        'cpu': CPUStatInfoToJSON(value['cpu']),
        'mem': MemStatInfoToJSON(value['mem']),
    };
}

