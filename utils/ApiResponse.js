/**
 * Standardized API response
 */
export class ApiResponse {
  /**
   * @param {any} data - Response payload
   * @param {string} [message='Success'] - Response message
   * @param {Object} [meta=null] - Optional metadata (pagination, count, etc.)
   * @param {boolean} [success=true] - Success flag
   */
  constructor(data, message = 'Success', meta = null, success = true) {
    this.success = success;
    this.message = message;
    this.data = data;
    if (meta) this.meta = meta;
  }

  /**
   * Convert response to JSON
   */
  toJSON() {
    const response = {
      success: this.success,
      message: this.message,
      data: this.data
    };
    if (this.meta) response.meta = this.meta;
    return response;
  }
}
